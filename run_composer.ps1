$source = Get-Content -Path "d:\kumpulan project\project flowerjjuice\CelestialComposer.cs" -Raw

$cp = New-Object System.CodeDom.Compiler.CompilerParameters
$cp.ReferencedAssemblies.Add("System.Drawing.dll") | Out-Null
$cp.CompilerOptions = "/unsafe"
$cp.GenerateInMemory = $true

$provider = New-Object Microsoft.CSharp.CSharpCodeProvider
$compileResult = $provider.CompileAssemblyFromSource($cp, $source)

if ($compileResult.Errors.HasErrors) {
    Write-Host "Compilation errors:"
    foreach ($err in $compileResult.Errors) {
        Write-Host $err.ToString()
    }
    exit 1
}

$type = $compileResult.CompiledAssembly.GetType("CelestialComposer")
$method = $type.GetMethod("ComposeMasterpiece")

$inputPath = "d:\kumpulan project\project flowerjjuice\seven_bracelets_aesthetic_clean_1791478849508.jpg"
$outputPath = "d:\kumpulan project\project flowerjjuice\seven_celestial_blooms_refined_masterpiece.jpg"

$method.Invoke($null, @($inputPath, $outputPath))

if (Test-Path $outputPath) {
    $info = Get-Item $outputPath
    Write-Host "Success! Created $outputPath with size $($info.Length) bytes"
} else {
    Write-Host "Failed to create output file."
    exit 1
}
