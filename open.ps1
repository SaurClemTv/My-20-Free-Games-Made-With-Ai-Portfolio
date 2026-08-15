$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$url = "http://127.0.0.1:8765/"

function ServerUp {
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
    return $r.StatusCode -ge 200
  } catch {
    return $false
  }
}

if (-not (ServerUp)) {
  Start-Process -WindowStyle Hidden -FilePath "powershell.exe" -ArgumentList @(
    "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command",
    @"
`$root = '$root'
`$listener = New-Object System.Net.HttpListener
`$listener.Prefixes.Add('http://127.0.0.1:8765/')
`$listener.Start()
`$mime = @{
  '.html'='text/html'; '.css'='text/css'; '.js'='text/javascript'
  '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'
  '.svg'='image/svg+xml'; '.ico'='image/x-icon'; '.mp4'='video/mp4'
}
while (`$listener.IsListening) {
  `$ctx = `$listener.GetContext()
  `$path = [Uri]::UnescapeDataString(`$ctx.Request.Url.LocalPath)
  if (`$path -eq '/') { `$path = '/index.html' }
  `$file = Join-Path `$root (`$path.TrimStart('/').Replace('/','\'))
  if (Test-Path `$file -PathType Leaf) {
    `$ext = [IO.Path]::GetExtension(`$file).ToLower()
    `$bytes = [IO.File]::ReadAllBytes(`$file)
    `$ctx.Response.ContentType = `$(if (`$mime.ContainsKey(`$ext)) { `$mime[`$ext] } else { 'application/octet-stream' })
    `$ctx.Response.Headers.Add('Cache-Control', 'no-cache')
    `$ctx.Response.ContentLength64 = `$bytes.Length
    `$ctx.Response.OutputStream.Write(`$bytes, 0, `$bytes.Length)
  } else { `$ctx.Response.StatusCode = 404 }
  `$ctx.Response.Close()
}
"@
  )
  $n = 0
  while (-not (ServerUp) -and $n -lt 40) {
    Start-Sleep -Milliseconds 150
    $n++
  }
}

$edge = @(
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($edge) {
  Start-Process $edge -ArgumentList "--app=$url", "--new-window"
} else {
  Start-Process $url
}
