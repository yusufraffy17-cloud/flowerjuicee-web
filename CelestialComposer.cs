using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class CelestialComposer
{
    public static void ComposeMasterpiece(string inputPath, string outputPath)
    {
        int W = 1920;
        int H = 1080;

        using (Bitmap resultBmp = new Bitmap(W, H, PixelFormat.Format32bppArgb))
        {
            // STEP 1: RENDER BASE BACKGROUND - ROYAL MIDNIGHT PLUM (#19132a to #241b3c)
            // Exactly matching the color of Image 1 (Header/Cover Brand Book)
            using (Graphics g = Graphics.FromImage(resultBmp))
            {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.CompositingQuality = CompositingQuality.HighQuality;

                // Radial gradient centered slightly above center
                using (GraphicsPath bgPath = new GraphicsPath())
                {
                    bgPath.AddRectangle(new Rectangle(0, 0, W, H));
                    using (PathGradientBrush pgb = new PathGradientBrush(bgPath))
                    {
                        pgb.CenterPoint = new PointF(W * 0.50f, H * 0.48f);
                        pgb.CenterColor = Color.FromArgb(255, 36, 27, 60); // Vibrant deep royal plum / amethyst
                        pgb.SurroundColors = new Color[] { Color.FromArgb(255, 18, 14, 30) }; // Midnight obsidian plum edge
                        g.FillRectangle(pgb, 0, 0, W, H);
                    }
                }

                // Ethereal subtle nebula dust in royal purple & celestial gold
                DrawNebula(g, W * 0.50f, H * 0.48f, 550, 400, Color.FromArgb(24, 85, 45, 140)); // Central violet nebula
                DrawNebula(g, W * 0.72f, H * 0.28f, 360, 260, Color.FromArgb(28, 212, 175, 55)); // Warm golden stardust near Honey Amber
                DrawNebula(g, W * 0.28f, H * 0.30f, 380, 280, Color.FromArgb(28, 0, 160, 210));  // Cold cyan nebula near Glacial Dew
                DrawNebula(g, W * 0.26f, H * 0.60f, 360, 260, Color.FromArgb(26, 120, 60, 190)); // Aurora purple mist
                DrawNebula(g, W * 0.76f, H * 0.55f, 360, 260, Color.FromArgb(24, 220, 100, 160)); // Pink twilight mist

                // CELESTIAL ASTROLABE ORBIT & FILIGREE (Classic Jewelry Gold #d4af37)
                PointF center = new PointF(W * 0.50f, H * 0.50f);
                float orbitR = 350f;

                // Main dashed golden orbit circle
                using (Pen goldOrbit = new Pen(Color.FromArgb(70, 212, 175, 55), 1.2f))
                {
                    goldOrbit.DashStyle = DashStyle.Dash;
                    goldOrbit.DashPattern = new float[] { 6, 6 };
                    g.DrawEllipse(goldOrbit, center.X - orbitR, center.Y - orbitR, orbitR * 2, orbitR * 2);
                }

                // Inner and outer concentric starlight rings
                using (Pen faintGold = new Pen(Color.FromArgb(35, 212, 175, 55), 0.8f))
                {
                    g.DrawEllipse(faintGold, center.X - (orbitR + 28), center.Y - (orbitR + 28), (orbitR + 28) * 2, (orbitR + 28) * 2);
                    g.DrawEllipse(faintGold, center.X - (orbitR - 28), center.Y - (orbitR - 28), (orbitR - 28) * 2, (orbitR - 28) * 2);
                }

                // Cardinal and intermediate degree ticks (Astrolabe aesthetics)
                for (int a = 0; a < 360; a += 15)
                {
                    double rad = a * Math.PI / 180.0;
                    float rIn = (a % 45 == 0) ? (orbitR - 10) : (orbitR - 5);
                    float rOut = (a % 45 == 0) ? (orbitR + 10) : (orbitR + 5);
                    float x1 = center.X + (float)(Math.Cos(rad) * rIn);
                    float y1 = center.Y + (float)(Math.Sin(rad) * rIn);
                    float x2 = center.X + (float)(Math.Cos(rad) * rOut);
                    float y2 = center.Y + (float)(Math.Sin(rad) * rOut);

                    int tickAlpha = (a % 45 == 0) ? 65 : 35;
                    using (Pen tickPen = new Pen(Color.FromArgb(tickAlpha, 212, 175, 55), 0.8f))
                    {
                        g.DrawLine(tickPen, x1, y1, x2, y2);
                    }
                }

                // Delicate constellation lines in the deep background
                DrawConstellation(g, new PointF[] {
                    new PointF(160, 130), new PointF(250, 90), new PointF(330, 120), new PointF(400, 80)
                }, Color.FromArgb(45, 212, 175, 55));

                DrawConstellation(g, new PointF[] {
                    new PointF(W - 180, 120), new PointF(W - 260, 80), new PointF(W - 340, 130), new PointF(W - 410, 100)
                }, Color.FromArgb(45, 240, 220, 180));

                DrawConstellation(g, new PointF[] {
                    new PointF(W - 150, H - 220), new PointF(W - 230, H - 170), new PointF(W - 310, H - 180)
                }, Color.FromArgb(45, 230, 190, 240));

                DrawConstellation(g, new PointF[] {
                    new PointF(180, H - 210), new PointF(260, H - 160), new PointF(340, H - 190)
                }, Color.FromArgb(45, 180, 210, 255));

                // Background starfield
                Random rnd = new Random(777);
                for (int i = 0; i < 180; i++)
                {
                    float sx = (float)(rnd.NextDouble() * W);
                    float sy = (float)(rnd.NextDouble() * H);
                    float sz = (float)(rnd.NextDouble() * 2.2 + 0.6);
                    int alpha = rnd.Next(40, 190);
                    Color starCol = (i % 6 == 0) ? Color.FromArgb(alpha, 255, 230, 170) : // warm gold
                                   (i % 6 == 1) ? Color.FromArgb(alpha, 210, 240, 255) : // cool white
                                   Color.FromArgb(alpha, 255, 255, 255);
                    using (SolidBrush sb = new SolidBrush(starCol))
                    {
                        g.FillEllipse(sb, sx - sz * 0.5f, sy - sz * 0.5f, sz, sz);
                    }
                }
            }

            // STEP 2: BLEND 7 BRACELETS WITH PRECISE LUMINANCE TRANSFER
            // Transfers bracelet signal onto the Royal Midnight Plum background
            using (Bitmap baseBmp = new Bitmap(inputPath))
            {
                TransferBraceletsOntoPlum(resultBmp, baseBmp, W, H);
            }

            // STEP 3: ENHANCE ALL 7 CHARACTERISTICS & "THE CELESTIAL BLOOMS" ESSENCE
            using (Graphics g = Graphics.FromImage(resultBmp))
            {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.CompositingQuality = CompositingQuality.HighQuality;
                Random rnd = new Random(888);

                // --- 1. GELANG 1: SKY AZURE (STELLA MARIS) - TOP CENTER ---
                float saX = W * 0.50f;
                float saY = H * 0.17f;

                // Warm morning dawn halo
                DrawRadialGlow(g, saX, saY - 30, 120, Color.FromArgb(70, 255, 225, 140));

                // Grand 8-pointed Morning Star (The Morning Star / Stella Maris)
                DrawEightPointedMorningStar(g, saX, saY - 45, 54f, 24f);

                // Dawn starlight glints
                DrawSparkleClusters(g, saX, saY, 70, Color.FromArgb(220, 255, 240, 180), rnd);

                // --- 2. GELANG 7: GLACIAL DEW (STELLA GLACIALIS) - TOP LEFT ---
                float gdX = W * 0.28f;
                float gdY = H * 0.29f;

                // Cold frosty cyan aura (distinctly icy, unlike Sky Azure's warm dawn star)
                DrawRadialGlow(g, gdX, gdY, 140, Color.FromArgb(75, 60, 245, 255));

                // Floating 3D Geometric Diamond Ice Crystals with sharp facets
                DrawDiamondIceCrystal(g, gdX - 98, gdY - 58, 28f, -25f);
                DrawDiamondIceCrystal(g, gdX - 68, gdY + 78, 24f, 35f);
                DrawDiamondIceCrystal(g, gdX + 88, gdY - 72, 30f, 15f);
                DrawDiamondIceCrystal(g, gdX + 92, gdY + 52, 22f, -40f);
                DrawDiamondIceCrystal(g, gdX - 114, gdY + 18, 20f, 55f);
                DrawDiamondIceCrystal(g, gdX + 18, gdY - 98, 26f, -10f);

                // Rainbow Refraction Prism Flares through ice crystals
                DrawPrismRainbowRefraction(g, gdX - 98, gdY - 58, 85f, 35f);
                DrawPrismRainbowRefraction(g, gdX + 88, gdY - 72, 95f, -45f);

                // Frozen starlight dewdrops
                DrawDewdrops(g, gdX, gdY, 100, rnd);

                // --- 3. GELANG 2: HONEY AMBER (SOLAR SOLSTICE) - TOP RIGHT ---
                float haX = W * 0.71f;
                float haY = H * 0.27f;
                DrawRadialGlow(g, haX, haY, 110, Color.FromArgb(50, 255, 195, 60)); // Royal gold halo

                // --- 4. GELANG 3: SAKURA PINK (LUNA CRESCENT) - MIDDLE RIGHT ---
                float spX = W * 0.75f;
                float spY = H * 0.52f;
                DrawRadialGlow(g, spX, spY, 100, Color.FromArgb(45, 255, 180, 210)); // Soft pink moonlight

                // --- 5. GELANG 4: VIVID MAGENTA (COSMIC NOVA) - BOTTOM RIGHT ---
                float vmX = W * 0.68f;
                float vmY = H * 0.77f;
                DrawRadialGlow(g, vmX, vmY, 100, Color.FromArgb(45, 245, 50, 160)); // Magenta stardust

                // --- 6. GELANG 5: DEEP VIOLET (MIDNIGHT GALAXY) - BOTTOM CENTER ---
                float dvX = W * 0.50f;
                float dvY = H * 0.81f;
                DrawRadialGlow(g, dvX, dvY, 110, Color.FromArgb(50, 160, 80, 250)); // Amethyst galaxy mist

                // --- 7. GELANG 6: AURORA LILAC (CELESTIA BOREALIS) - BOTTOM LEFT ---
                float alX = W * 0.27f;
                float alY = H * 0.57f;
                DrawRadialGlow(g, alX, alY, 110, Color.FromArgb(48, 185, 120, 255)); // Aurora veil

                // --- 8. "THE CELESTIAL BLOOMS" ESSENCE: FLOATING GLOWING PETALS ---
                // Translucent starlight flower petals floating across the cosmic purple night
                DrawFloatingPetal(g, W * 0.42f, H * 0.38f, 18f, 25f, Color.FromArgb(170, 252, 231, 243));
                DrawFloatingPetal(g, W * 0.58f, H * 0.42f, 16f, -35f, Color.FromArgb(160, 243, 232, 255));
                DrawFloatingPetal(g, W * 0.47f, H * 0.60f, 20f, 65f, Color.FromArgb(170, 255, 220, 235));
                DrawFloatingPetal(g, W * 0.38f, H * 0.48f, 15f, -15f, Color.FromArgb(150, 220, 245, 255));
                DrawFloatingPetal(g, W * 0.62f, H * 0.58f, 17f, 45f, Color.FromArgb(160, 255, 235, 210));
                DrawFloatingPetal(g, W * 0.50f, H * 0.32f, 14f, -50f, Color.FromArgb(180, 255, 245, 220));
                DrawFloatingPetal(g, W * 0.65f, H * 0.38f, 16f, 15f, Color.FromArgb(170, 254, 215, 226));
                DrawFloatingPetal(g, W * 0.33f, H * 0.42f, 18f, -70f, Color.FromArgb(160, 200, 240, 255));

                // Elegant subtle vignette
                using (GraphicsPath vPath = new GraphicsPath())
                {
                    vPath.AddRectangle(new Rectangle(0, 0, W, H));
                    using (PathGradientBrush vPgb = new PathGradientBrush(vPath))
                    {
                        vPgb.CenterPoint = new PointF(W * 0.5f, H * 0.5f);
                        vPgb.CenterColor = Color.FromArgb(0, 0, 0, 0);
                        vPgb.SurroundColors = new Color[] { Color.FromArgb(110, 10, 8, 18) };
                        g.FillRectangle(vPgb, 0, 0, W, H);
                    }
                }
            }

            // Save Masterpiece as High-Resolution JPEG (Quality 96)
            ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);
            EncoderParameters encParams = new EncoderParameters(1);
            encParams.Param[0] = new EncoderParameter(Encoder.Quality, 96L);
            resultBmp.Save(outputPath, jpgEncoder, encParams);
            Console.WriteLine("Masterpiece successfully rendered and saved to: " + outputPath);
        }
    }

    // Precise luminance and chromaticity transfer onto the Royal Plum background
    private static void TransferBraceletsOntoPlum(Bitmap dest, Bitmap src, int destW, int destH)
    {
        float sx = (float)destW / src.Width;
        float sy = (float)destH / src.Height;

        BitmapData destData = dest.LockBits(new Rectangle(0, 0, destW, destH), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
        BitmapData srcData = src.LockBits(new Rectangle(0, 0, src.Width, src.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);

        unsafe
        {
            byte* destScan0 = (byte*)destData.Scan0;
            byte* srcScan0 = (byte*)srcData.Scan0;

            for (int y = 0; y < destH; y++)
            {
                int srcY = (int)(y / sy);
                if (srcY >= src.Height) srcY = src.Height - 1;
                byte* srcRow = srcScan0 + (srcY * srcData.Stride);
                byte* destRow = destScan0 + (y * destData.Stride);

                float vFactor = (float)srcY / src.Height;
                // Old background color in source image
                float bgSrcR = 23f + 45f * vFactor;
                float bgSrcG = 33f + 47f * vFactor;
                float bgSrcB = 58f + 58f * vFactor;

                for (int x = 0; x < destW; x++)
                {
                    int srcX = (int)(x / sx);
                    if (srcX >= src.Width) srcX = src.Width - 1;

                    byte* sp = srcRow + (srcX * 4);
                    byte* dp = destRow + (x * 4);

                    float sB = sp[0];
                    float sG = sp[1];
                    float sR = sp[2];

                    // Compute excess bracelet signal above background
                    float diffR = Math.Max(0f, sR - bgSrcR);
                    float diffG = Math.Max(0f, sG - bgSrcG);
                    float diffB = Math.Max(0f, sB - bgSrcB);

                    // Destination base Royal Plum color
                    float dB = dp[0];
                    float dG = dp[1];
                    float dR = dp[2];

                    // Composite bracelet signal onto royal plum background
                    // Boost saturation slightly so jewel tones pop against the deep plum
                    float boost = 1.05f;
                    float nB = Math.Min(255f, dB + diffB * boost);
                    float nG = Math.Min(255f, dG + diffG * boost);
                    float nR = Math.Min(255f, dR + diffR * boost);

                    dp[0] = (byte)nB;
                    dp[1] = (byte)nG;
                    dp[2] = (byte)nR;
                    dp[3] = 255;
                }
            }
        }

        dest.UnlockBits(destData);
        src.UnlockBits(srcData);
    }

    private static void DrawNebula(Graphics g, float cx, float cy, float rx, float ry, Color color)
    {
        using (GraphicsPath p = new GraphicsPath())
        {
            p.AddEllipse(cx - rx, cy - ry, rx * 2, ry * 2);
            using (PathGradientBrush pgb = new PathGradientBrush(p))
            {
                pgb.CenterPoint = new PointF(cx, cy);
                pgb.CenterColor = color;
                pgb.SurroundColors = new Color[] { Color.FromArgb(0, color.R, color.G, color.B) };
                g.FillEllipse(pgb, cx - rx, cy - ry, rx * 2, ry * 2);
            }
        }
    }

    private static void DrawRadialGlow(Graphics g, float cx, float cy, float radius, Color color)
    {
        using (GraphicsPath p = new GraphicsPath())
        {
            p.AddEllipse(cx - radius, cy - radius, radius * 2, radius * 2);
            using (PathGradientBrush pgb = new PathGradientBrush(p))
            {
                pgb.CenterPoint = new PointF(cx, cy);
                pgb.CenterColor = color;
                pgb.SurroundColors = new Color[] { Color.FromArgb(0, color.R, color.G, color.B) };
                g.FillEllipse(pgb, cx - radius, cy - radius, radius * 2, radius * 2);
            }
        }
    }

    private static void DrawConstellation(Graphics g, PointF[] points, Color color)
    {
        using (Pen pen = new Pen(color, 0.8f))
        {
            pen.DashStyle = DashStyle.Dot;
            for (int i = 0; i < points.Length - 1; i++)
            {
                g.DrawLine(pen, points[i], points[i + 1]);
            }
        }
        using (SolidBrush sb = new SolidBrush(Color.FromArgb(170, color.R, color.G, color.B)))
        {
            foreach (var pt in points)
            {
                g.FillEllipse(sb, pt.X - 2.5f, pt.Y - 2.5f, 5f, 5f);
            }
        }
    }

    // 8-Pointed Morning Star (Stella Maris) with sharp diamond flares
    private static void DrawEightPointedMorningStar(Graphics g, float cx, float cy, float outerR, float diagR)
    {
        DrawRadialGlow(g, cx, cy, outerR * 1.6f, Color.FromArgb(140, 255, 235, 170));
        DrawRadialGlow(g, cx, cy, outerR * 0.8f, Color.FromArgb(210, 255, 255, 235));

        // 4 Primary Beams (Vertical & Horizontal)
        DrawTaperedBeam(g, cx, cy, outerR, 4.5f, 0f, Color.FromArgb(245, 255, 255, 250), Color.FromArgb(0, 255, 230, 140));
        DrawTaperedBeam(g, cx, cy, outerR, 4.5f, 90f, Color.FromArgb(245, 255, 255, 250), Color.FromArgb(0, 255, 230, 140));

        // 4 Diagonal Beams
        DrawTaperedBeam(g, cx, cy, diagR, 3.2f, 45f, Color.FromArgb(220, 255, 245, 200), Color.FromArgb(0, 255, 210, 120));
        DrawTaperedBeam(g, cx, cy, diagR, 3.2f, 135f, Color.FromArgb(220, 255, 245, 200), Color.FromArgb(0, 255, 210, 120));

        // Brilliant diamond core
        PointF[] corePts = new PointF[] {
            new PointF(cx, cy - 6), new PointF(cx + 6, cy), new PointF(cx, cy + 6), new PointF(cx - 6, cy)
        };
        using (SolidBrush sb = new SolidBrush(Color.FromArgb(255, 255, 255, 255)))
        {
            g.FillPolygon(sb, corePts);
        }
    }

    private static void DrawTaperedBeam(Graphics g, float cx, float cy, float len, float width, float angleDeg, Color centerCol, Color tipCol)
    {
        GraphicsState state = g.Save();
        g.TranslateTransform(cx, cy);
        g.RotateTransform(angleDeg);

        PointF[] pts = new PointF[] {
            new PointF(0, -len), new PointF(width * 0.5f, 0), new PointF(0, len), new PointF(-width * 0.5f, 0)
        };
        using (LinearGradientBrush lgb = new LinearGradientBrush(new PointF(0, -len), new PointF(0, len), tipCol, tipCol))
        {
            ColorBlend cb = new ColorBlend(3);
            cb.Colors = new Color[] { tipCol, centerCol, tipCol };
            cb.Positions = new float[] { 0f, 0.5f, 1.0f };
            lgb.InterpolationColors = cb;
            g.FillPolygon(lgb, pts);
        }

        g.Restore(state);
    }

    // 3D Geometric Diamond Ice Crystal for Glacial Dew
    private static void DrawDiamondIceCrystal(Graphics g, float cx, float cy, float size, float angleDeg)
    {
        GraphicsState state = g.Save();
        g.TranslateTransform(cx, cy);
        g.RotateTransform(angleDeg);

        float w = size * 0.55f;
        float h = size;

        PointF top = new PointF(0, -h);
        PointF btm = new PointF(0, h);
        PointF left = new PointF(-w, 0);
        PointF right = new PointF(w, 0);
        PointF cTop = new PointF(0, -h * 0.25f);
        PointF cBtm = new PointF(0, h * 0.25f);

        // Facets with varying cyan and blue opalescence
        using (SolidBrush b1 = new SolidBrush(Color.FromArgb(190, 215, 250, 255)))
        {
            g.FillPolygon(b1, new PointF[] { top, left, cTop });
        }
        using (SolidBrush b2 = new SolidBrush(Color.FromArgb(235, 245, 255, 255)))
        {
            g.FillPolygon(b2, new PointF[] { top, right, cTop });
        }
        using (SolidBrush b3 = new SolidBrush(Color.FromArgb(210, 185, 240, 255)))
        {
            g.FillPolygon(b3, new PointF[] { cTop, right, cBtm, left });
        }
        using (SolidBrush b4 = new SolidBrush(Color.FromArgb(170, 110, 215, 245)))
        {
            g.FillPolygon(b4, new PointF[] { left, btm, cBtm });
        }
        using (SolidBrush b5 = new SolidBrush(Color.FromArgb(200, 160, 235, 255)))
        {
            g.FillPolygon(b5, new PointF[] { right, btm, cBtm });
        }

        // Crisp crystalline diamond edges
        using (Pen edgePen = new Pen(Color.FromArgb(245, 240, 255, 255), 1.0f))
        {
            g.DrawPolygon(edgePen, new PointF[] { top, right, btm, left });
            g.DrawLine(edgePen, top, cTop);
            g.DrawLine(edgePen, btm, cBtm);
            g.DrawLine(edgePen, left, cTop);
            g.DrawLine(edgePen, right, cTop);
            g.DrawLine(edgePen, left, cBtm);
            g.DrawLine(edgePen, right, cBtm);
            g.DrawLine(edgePen, cTop, cBtm);
        }

        using (SolidBrush dot = new SolidBrush(Color.FromArgb(255, 255, 255, 255)))
        {
            g.FillEllipse(dot, -1.5f, -h * 0.45f, 3f, 3f);
        }

        g.Restore(state);
    }

    private static void DrawPrismRainbowRefraction(Graphics g, float cx, float cy, float len, float angleDeg)
    {
        GraphicsState state = g.Save();
        g.TranslateTransform(cx, cy);
        g.RotateTransform(angleDeg);

        PointF p1 = new PointF(-len * 0.5f, 0);
        PointF p2 = new PointF(len * 0.5f, 0);

        using (LinearGradientBrush lgb = new LinearGradientBrush(p1, p2, Color.Transparent, Color.Transparent))
        {
            ColorBlend cb = new ColorBlend(6);
            cb.Colors = new Color[] {
                Color.FromArgb(0, 255, 100, 100),
                Color.FromArgb(130, 255, 200, 80),
                Color.FromArgb(170, 100, 255, 200),
                Color.FromArgb(170, 80, 200, 255),
                Color.FromArgb(130, 180, 120, 255),
                Color.FromArgb(0, 255, 120, 220)
            };
            cb.Positions = new float[] { 0f, 0.2f, 0.4f, 0.6f, 0.8f, 1.0f };
            lgb.InterpolationColors = cb;

            using (Pen pen = new Pen(lgb, 1.8f))
            {
                g.DrawLine(pen, p1, p2);
            }
        }

        g.Restore(state);
    }

    private static void DrawDewdrops(Graphics g, float cx, float cy, float radius, Random rnd)
    {
        for (int i = 0; i < 20; i++)
        {
            double ang = rnd.NextDouble() * Math.PI * 2;
            double dist = rnd.NextDouble() * radius * 0.9 + 30;
            float dx = cx + (float)(Math.Cos(ang) * dist);
            float dy = cy + (float)(Math.Sin(ang) * dist);
            float sz = (float)(rnd.NextDouble() * 3.5 + 2.0);

            using (SolidBrush drop = new SolidBrush(Color.FromArgb(170, 180, 245, 255)))
            {
                g.FillEllipse(drop, dx - sz * 0.5f, dy - sz * 0.5f, sz, sz);
            }
            using (SolidBrush spec = new SolidBrush(Color.FromArgb(245, 255, 255, 255)))
            {
                g.FillEllipse(spec, dx - sz * 0.25f, dy - sz * 0.35f, sz * 0.4f, sz * 0.4f);
            }
        }
    }

    private static void DrawSparkleClusters(Graphics g, float cx, float cy, float radius, Color color, Random rnd)
    {
        for (int i = 0; i < 14; i++)
        {
            double ang = rnd.NextDouble() * Math.PI * 2;
            double dist = rnd.NextDouble() * radius * 0.8 + 20;
            float px = cx + (float)(Math.Cos(ang) * dist);
            float py = cy + (float)(Math.Sin(ang) * dist);

            using (Pen p = new Pen(color, 0.9f))
            {
                g.DrawLine(p, px - 3.5f, py, px + 3.5f, py);
                g.DrawLine(p, px, py - 3.5f, px, py + 3.5f);
            }
        }
    }

    // Draws translucent glowing cherry blossom petal (The Celestial Blooms)
    private static void DrawFloatingPetal(Graphics g, float cx, float cy, float size, float angleDeg, Color petalColor)
    {
        GraphicsState state = g.Save();
        g.TranslateTransform(cx, cy);
        g.RotateTransform(angleDeg);

        float w = size * 0.55f;
        float h = size;

        using (GraphicsPath path = new GraphicsPath())
        {
            // Curved teardrop/sakura petal shape
            path.AddBezier(0, -h, w, -h * 0.3f, w * 0.8f, h * 0.6f, 0, h);
            path.AddBezier(0, h, -w * 0.8f, h * 0.6f, -w, -h * 0.3f, 0, -h);

            // Translucent glowing fill
            using (PathGradientBrush pgb = new PathGradientBrush(path))
            {
                pgb.CenterPoint = new PointF(0, 0);
                pgb.CenterColor = petalColor;
                pgb.SurroundColors = new Color[] { Color.FromArgb(40, petalColor.R, petalColor.G, petalColor.B) };
                g.FillPath(pgb, path);
            }

            // Delicate gold gilded edge glint
            using (Pen edgePen = new Pen(Color.FromArgb(90, 212, 175, 55), 0.9f))
            {
                g.DrawPath(edgePen, path);
            }
        }

        g.Restore(state);
    }

    private static ImageCodecInfo GetEncoder(ImageFormat format)
    {
        ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();
        foreach (ImageCodecInfo codec in codecs)
        {
            if (codec.FormatID == format.Guid) return codec;
        }
        return null;
    }
}
