$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:8768/")
$listener.Start()
Write-Output "serving http://127.0.0.1:8768/"
$mime = @{
  ".html"="text/html"; ".css"="text/css"; ".js"="text/javascript"
  ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"
  ".svg"="image/svg+xml"; ".ico"="image/x-icon"
  ".mp4"="video/mp4"; ".webm"="video/webm"; ".ogg"="audio/ogg"
  ".wav"="audio/wav"; ".mp3"="audio/mpeg"
}
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.LocalPath)
  if ($path -eq "/") { $path = "/index.html" }
  $file = Join-Path $root ($path.TrimStart("/").Replace("/","\"))
  if (Test-Path $file -PathType Leaf) {
    $ext = [IO.Path]::GetExtension($file).ToLower()
    $bytes = [IO.File]::ReadAllBytes($file)
    $ctx.Response.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" })
    $ctx.Response.Headers.Add("Cache-Control", "no-cache")
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
  }
  $ctx.Response.Close()
}
