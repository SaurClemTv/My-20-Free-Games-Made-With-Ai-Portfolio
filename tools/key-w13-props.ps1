Add-Type -AssemblyName System.Drawing
function Key-And-Crop {
  param([string]$InPath, [string]$OutPath)
  if (-not (Test-Path $InPath)) { Write-Host "MISSING $InPath"; return }
  $srcBmp = [System.Drawing.Bitmap]::FromFile($InPath)
  $w = $srcBmp.Width; $h = $srcBmp.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $srcData = $srcBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $bytes = $srcData.Stride * $h
  $buf = New-Object byte[] $bytes
  [Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $buf, 0, $bytes)
  $srcBmp.UnlockBits($srcData)
  $minX = $w; $minY = $h; $maxX = 0; $maxY = 0
  $stride = $srcData.Stride
  for ($y = 0; $y -lt $h; $y++) {
    $row = $y * $stride
    for ($x = 0; $x -lt $w; $x++) {
      $i = $row + $x * 4
      $b = [int]$buf[$i]; $g = [int]$buf[$i+1]; $r = [int]$buf[$i+2]
      $isMag = ($r -gt 155 -and $g -lt 150 -and $b -gt 70 -and ($r - $g) -gt 35)
      if ($isMag) { $buf[$i+3] = 0 } else {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  $pad = 6
  $minX = [Math]::Max(0, $minX - $pad); $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($w-1, $maxX + $pad); $maxY = [Math]::Min($h-1, $maxY + $pad)
  $cw = $maxX - $minX + 1; $ch = $maxY - $minY + 1
  $full = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $fullData = $full.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  [Runtime.InteropServices.Marshal]::Copy($buf, 0, $fullData.Scan0, $bytes)
  $full.UnlockBits($fullData)
  $crop = New-Object System.Drawing.Bitmap $cw, $ch, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gfx = [System.Drawing.Graphics]::FromImage($crop)
  $gfx.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $gfx.DrawImage($full, (New-Object System.Drawing.Rectangle 0,0,$cw,$ch), $minX, $minY, $cw, $ch, [System.Drawing.GraphicsUnit]::Pixel)
  $gfx.Dispose()
  $dir = Split-Path $OutPath -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  $crop.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose(); $full.Dispose(); $srcBmp.Dispose()
  Write-Host "OK $OutPath ($cw x $ch)"
}
$src = "C:\Users\justi\.grok\sessions\C%3A%5CUsers%5Cjusti\01a003f7-1535-7191-9ef4-e6d99ed11df1\images"
$props = "C:\Users\justi\Cozy-Platformer\assets\props"
$map = [ordered]@{
  "150.jpg"="cloud-fern.png"
  "151.jpg"="savanna-tree.png"
  "152.jpg"="mangrove-root.png"
  "153.jpg"="canyon-spire.png"
  "154.jpg"="savanna-bush.png"
  "155.jpg"="kelp-blade.png"
  "156.jpg"="tundra-rock.png"
  "157.jpg"="terrace-rice.png"
  "158.jpg"="tundra-shrub.png"
  "159.jpg"="steam-vent.png"
  "160.jpg"="crystal-spire.png"
  "161.jpg"="crystal-cluster.png"
  "162.jpg"="crater-rock.png"
  "163.jpg"="redwood-trunk.png"
  "164.jpg"="atoll-palm.png"
}
foreach ($k in $map.Keys) {
  Key-And-Crop (Join-Path $src $k) (Join-Path $props $map[$k])
}
