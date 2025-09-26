"use client"

import type React from "react"
import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
  studentImage?: string
  backgroundImage?: string
  logoText?: string
  logoImage?: string
}

export function AuthLayout({
  children,
  studentImage = "/images/student-desk.png",
  backgroundImage,
  logoText = "WORLD OF INTERNS",
  logoImage,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Optional Background Pattern */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-60"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-orange-500 rounded-full opacity-40"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-green-500 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 right-40 w-5 h-5 bg-purple-500 rounded-full opacity-30"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Modal Card */}
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Panel - Student Image */}
            <div className="lg:w-1/2 relative overflow-hidden">
              {/* Logo */}
              <div className="absolute left-1 z-20">
                <div className="flex items-center gap-2">
                  {logoImage ? (
                    <Image
                      src={logoImage}
                      alt="Logo"
                      width={100}
                      height={35}
                      className="object-contain"
                    />
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">W</span>
                      </div>
                      <span className="text-orange-500 font-bold text-sm">{logoText}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Student Image */}
              <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={studentImage || "/placeholder.svg"}
                  alt="Student at desk"
                  fill
                  className="object-cover object-center translate-x-[5%]"
                  priority
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="lg:w-1/2 p-8 lg:p-10 bg-slate-800">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
