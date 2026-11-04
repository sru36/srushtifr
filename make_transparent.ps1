Add-Type -AssemblyName System.Drawing

function Remove-WhiteBg($inputPath, $outputPath) {
    $bmp = New-Object System.Drawing.Bitmap($inputPath)
    $newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            # If near white, make transparent
            if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
                $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                $newBmp.SetPixel($x, $y, $c)
            }
        }
    }
    
    $newBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $newBmp.Dispose()
    Write-Host "Processed $inputPath -> $outputPath"
}

Remove-WhiteBg "s:\sruxcx\star-pink.png" "s:\sruxcx\star-pink-clean.png"
Remove-WhiteBg "s:\sruxcx\disco-ball.png" "s:\sruxcx\disco-ball-clean.png"
Remove-WhiteBg "s:\sruxcx\star-balloon.png" "s:\sruxcx\star-balloon-clean.png"
Remove-WhiteBg "s:\sruxcx\star-chrome.png" "s:\sruxcx\star-chrome-clean.png"
