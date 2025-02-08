"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { EclipseIcon as Ethereum, CircleDollarSign, Loader2 } from "lucide-react"

interface MintModalProps {
  isOpen: boolean
  onClose: () => void
  mintQuantity: number
  setMintQuantity: (quantity: number) => void
  paymentMethod: "ETH" | "USDC"
  setPaymentMethod: (method: "ETH" | "USDC") => void
}

enum MintState {
  Initial = 0,
  Confirm = 1,
  Success = 2,
}

export function MintModal({
  isOpen,
  onClose,
  mintQuantity,
  setMintQuantity,
  paymentMethod,
  setPaymentMethod,
}: MintModalProps) {
  const [isSliderInteracting, setIsSliderInteracting] = useState(false)
  const [mintState, setMintState] = useState<MintState>(MintState.Initial)
  const modalRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()

  const handleSliderPointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation()
    setIsSliderInteracting(true)
  }, [])

  const handleSliderPointerUp = useCallback(() => {
    setIsSliderInteracting(false)
  }, [])

  useEffect(() => {
    const handlePointerUp = () => {
      setIsSliderInteracting(false)
    }

    document.addEventListener("pointerup", handlePointerUp)
    return () => {
      document.removeEventListener("pointerup", handlePointerUp)
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleDragStart = (event: React.PointerEvent) => {
    if (!isSliderInteracting) {
      dragControls.start(event)
    }
  }

  const handleMint = () => {
    setMintState(MintState.Confirm)
    setTimeout(() => {
      setMintState(MintState.Success)
    }, 3000)
  }

  const handleClose = () => {
    setMintState(MintState.Initial)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            ref={modalRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            drag={isSliderInteracting ? false : "y"}
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) handleClose()
            }}
            className="fixed inset-x-4 bottom-4 z-50 bg-black border-2 border-white/20 rounded-2xl shadow-lg shadow-black/50"
            onPointerDown={handleDragStart}
          >
            <div className="flex justify-center p-2">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>

            <div className="h-[400px] flex items-center justify-center">
              {mintState === MintState.Initial && (
                <div className="p-8 space-y-8 max-w-sm w-full">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/60"># of editions</span>
                      <span className="text-sm">{mintQuantity}</span>
                    </div>
                    <Slider
                      min={1}
                      max={500}
                      step={1}
                      value={[mintQuantity]}
                      onValueChange={(value) => setMintQuantity(value[0])}
                      className="w-full"
                      onPointerDown={handleSliderPointerDown}
                      onPointerUp={handleSliderPointerUp}
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm text-white/60">checkout with</span>
                    <div className="flex justify-center items-center gap-4">
                      <Button
                        variant="outline"
                        className={`flex-1 flex items-center justify-center gap-2 py-6 bg-black hover:bg-black/90 ${
                          paymentMethod === "ETH"
                            ? "border-2 border-white text-white"
                            : "border border-white/20 text-white/60 hover:text-white"
                        }`}
                        onClick={() => setPaymentMethod("ETH")}
                      >
                        <Ethereum className="w-5 h-5" />
                        ETH
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex-1 flex items-center justify-center gap-2 py-6 bg-black hover:bg-black/90 ${
                          paymentMethod === "USDC"
                            ? "border-2 border-white text-white"
                            : "border border-white/20 text-white/60 hover:text-white"
                        }`}
                        onClick={() => setPaymentMethod("USDC")}
                      >
                        <CircleDollarSign className="w-5 h-5" />
                        USDC
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full py-6 text-lg border-2 bg-white text-black hover:bg-white/90 hover:text-black"
                    onClick={handleMint}
                  >
                    MINT
                  </Button>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Total Cost</span>
                    <span>
                      {paymentMethod === "ETH" ? `${(mintQuantity * 0.0003).toFixed(4)} ETH` : `${mintQuantity} USDC`}
                    </span>
                  </div>
                </div>
              )}

              {mintState === MintState.Confirm && (
                <div className="p-8 max-w-sm w-full relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-lg font-bold">Minting on Base</span>
                    </div>
                    <div className="text-center text-lg">Confirm in wallet...</div>
                  </div>
                  <div className="absolute inset-0 -z-10">
                    <motion.div
                      className="w-full h-full"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <div className="w-64 h-64 border-4 border-white/10 rounded-full blur-md" />
                    </motion.div>
                  </div>
                </div>
              )}

              {mintState === MintState.Success && (
                <div className="p-8 max-w-sm w-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 bg-black border-2 border-white/20 rounded-full relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 rounded-full border-2 border-white/40 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white/40" />
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-lg">
                      You minted {mintQuantity} edition{mintQuantity > 1 ? "s" : ""} of AT001!
                    </p>
                    <Button
                      variant="outline"
                      className="w-full py-6 text-lg border-2 bg-white text-black hover:bg-white/90 hover:text-black"
                      onClick={handleClose}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

