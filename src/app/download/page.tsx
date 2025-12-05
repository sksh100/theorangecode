"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ModernNavbar = dynamic(() => import('@/components/ModernNavbar').then(mod => ({ default: mod.ModernNavbar })), { ssr: false });
const ModernFooter = dynamic(() => import('@/components/ModernFooter').then(mod => ({ default: mod.ModernFooter })), { ssr: false });

function DownloadContent() {
  const params = useSearchParams();
  const token = params.get("token");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Auto-download if token is present
    if (token && !downloading && !error) {
      handleDownload();
    }
  }, [token]);

  const handleDownload = async () => {
    if (!token) {
      setError("Missing download token.");
      return;
    }

    setDownloading(true);
    setError(null);

    try {
      const response = await fetch(`/api/download?token=${encodeURIComponent(token)}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to download ebook");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "UK-to-UAE-Cultural-Intelligence-Guide.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setDownloading(false);
    } catch (err: any) {
      console.error("Download error:", err);
      setError(err.message || "Failed to download ebook. Please try again.");
      setDownloading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-primary-dark text-white flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-orange mx-auto" />
          <h1 className="text-2xl font-semibold">Missing Download Token</h1>
          <p className="text-white/70">No download token provided. Please use the link from your purchase confirmation email.</p>
          <Link
            href="/"
            className="inline-block mt-4 text-azure-blue hover:text-orange underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-primary-dark text-white min-h-screen">
      <ModernNavbar />
      
      <main className="min-h-screen flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-6"
        >
          {error ? (
            <>
              <div className="glass-card bg-primary-dark/90 backdrop-blur-[30px] border border-red-500/30 rounded-3xl p-8 md:p-12">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-semibold mb-4">Download Error</h1>
                <p className="text-white/70 mb-6">{error}</p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
                  >
                    Try Again
                  </button>
                  <Link
                    href="/"
                    className="text-azure-blue hover:text-orange underline text-sm"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </>
          ) : downloading ? (
            <div className="glass-card bg-primary-dark/90 backdrop-blur-[30px] border border-azure-blue/30 rounded-3xl p-8 md:p-12">
              <Loader2 className="w-16 h-16 text-azure-blue mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-semibold mb-4">Preparing Your Download</h1>
              <p className="text-white/70">Your personalized ebook is being prepared...</p>
            </div>
          ) : (
            <div className="glass-card bg-primary-dark/90 backdrop-blur-[30px] border border-azure-blue/30 rounded-3xl p-8 md:p-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-2xl font-semibold mb-4">Thank You for Your Purchase</h1>
              <p className="text-white/80 mb-6">
                You can download your guide using the button below. The file is personalized with your email for security.
              </p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-orange to-orange/80 hover:from-orange/90 hover:to-orange/70 text-white font-semibold transition-all duration-300 shadow-glow-orange hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download Your Guide
              </button>
              <p className="text-xs text-white/50 mt-6">
                The link is time-limited for security. Please save the file to your device.
              </p>
              <Link
                href="/"
                className="inline-block mt-4 text-azure-blue hover:text-orange underline text-sm"
              >
                Return to Home
              </Link>
            </div>
          )}
        </motion.div>
      </main>
      
      <ModernFooter />
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="relative w-full bg-primary-dark text-white min-h-screen flex items-center justify-center">
        <div className="glass-card bg-primary-dark/90 backdrop-blur-[30px] border border-azure-blue/30 rounded-3xl p-8 md:p-12 text-center">
          <Loader2 className="w-16 h-16 text-azure-blue mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-semibold mb-4">Loading...</h1>
          <p className="text-white/70">Preparing your download...</p>
        </div>
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}

