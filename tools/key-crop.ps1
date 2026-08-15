Add-Type -AssemblyName System.Drawing

function Key-And-Crop {
  param(
    [string]$InPath,
    [string]$OutPath
  )
  $src = [System.Drawing.Bitmap]::FromFile($InPath)
  $w = $src.Width
  $h = $src.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $bytes = $srcData.Stride * $h
  $buf = New-Object byte[] $bytes
  [Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $buf, 0, $bytes)
  $src.UnlockBits($srcData)

  $minX = $w; $minY = $h; $maxX = 0; $maxY = 0
  $stride = $srcData.Stride
  for ($y = 0; $y -lt $h; $y++) {
    $row = $y * $stride
    for ($x = 0; $x -lt $w; $x++) {
      $i = $row + $x * 4
      $b = [int]$buf[$i]
      $g = [int]$buf[$i + 1]
      $r = [int]$buf[$i + 2]
      $isMag = ($r -gt 155 -and $g -lt 150 -and $b -gt 70 -and ($r - $g) -gt 35)
      if ($isMag) {
        $buf[$i + 3] = 0
      } else {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }

  if ($maxX -lt $minX) {
    $src.Dispose()
    throw "No opaque pixels in $InPath"
  }

  $pad = 6
  $minX = [Math]::Max(0, $minX - $pad)
  $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($w - 1, $maxX + $pad)
  $maxY = [Math]::Min($h - 1, $maxY + $pad)
  $cw = $maxX - $minX + 1
  $ch = $maxY - $minY + 1

  $full = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $fullData = $full.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  [Runtime.InteropServices.Marshal]::Copy($buf, 0, $fullData.Scan0, $bytes)
  $full.UnlockBits($fullData)

  $crop = New-Object System.Drawing.Bitmap $cw, $ch, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gfx = [System.Drawing.Graphics]::FromImage($crop)
  $gfx.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $gfx.DrawImage($full, (New-Object System.Drawing.Rectangle 0, 0, $cw, $ch), $minX, $minY, $cw, $ch, [System.Drawing.GraphicsUnit]::Pixel)
  $gfx.Dispose()
  $dir = Split-Path $OutPath -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  $crop.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose()
  $full.Dispose()
  $src.Dispose()
  Write-Host "OK $OutPath ($cw x $ch)"
}

$src = "C:\Users\justi\.grok\sessions\C%3A%5CUsers%5Cjusti\01a003f7-1535-7191-9ef4-e6d99ed11df1\images"
$props = "C:\Users\justi\Cozy-Platformer\assets\props"

$map = @{
  "73.jpg" = "brook-hill-a.png"
  "74.jpg" = "canopy-hill-a.png"
  "75.jpg" = "tide-hill-a.png"
  "76.jpg" = "dune-hill-a.png"
  "77.jpg" = "canopy-hill-b.png"
  "78.jpg" = "meadow-hill4.png"
  "79.jpg" = "brook-hill-b.png"
  "80.jpg" = "tide-hill-b.png"
  "81.jpg" = "brook-hill-c.png"
  "82.jpg" = "dune-hill-b.png"
}

foreach ($k in $map.Keys) {
  Key-And-Crop -InPath (Join-Path $src $k) -OutPath (Join-Path $props $map[$k])
}
