import BuiltInEditor from "./how-it-works/built-in-editor";
import IntegrationBeam from "./how-it-works/integration-beam"
import MarqueeCertification from "./how-it-works/marquee-certification";
import ProgressTracking from "./how-it-works/progress-tracking";

const HowItWorks = function () {
  return (
    <section className="relative py-20" id="how-it-works">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="text-base md:text-lg font-semibold text-neutral-500">It&apos;s important to know</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold">How it works</h2>
          <p className="mt-5 text-neutral-50">Curious about the technology that powers {process.env.NEXT_PUBLIC_SITE_NAME}? We have built a robust platform that combines cutting-edge educational tools with blockchain transparency, ensuring a smooth learning experience and tamper-proof certification.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-4">

          <div className="lg:col-span-3 group relative flex flex-col justify-between overflow-hidden rounded-xl transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
            <div className="h-48 relative left-10 top-10 opacity-70 grayscale">
              <BuiltInEditor />
            </div>
            <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-neutral-300">Interactive Learning Experience</h3>
              <p className=" text-neutral-400 leading-relaxed">As you progress through courses, you&apos;ll complete coding exercises directly in your browser. The editor runs your code in real time, offering immediate feedback and helping you learn by doing.</p>
            </div>
          </div>

          <div className="lg:col-span-2 group relative flex flex-col justify-between overflow-hidden rounded-xl transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
            <div className="relative left-20 top-5 opacity-70">
              <ProgressTracking />
            </div>

            <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-neutral-300">Progress Tracking</h3>
              <p className=" text-neutral-400 leading-relaxed">To keep you motivated, {process.env.NEXT_PUBLIC_SITE_NAME} tracks your progress for completed exercises.</p>
            </div>
          </div>

          <div className="lg:col-span-2 group relative flex flex-col justify-between overflow-hidden rounded-xl transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
            <IntegrationBeam />
            <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-neutral-300">Blockchain-Powered Certification</h3>
              <p className=" text-neutral-400 leading-relaxed">At {process.env.NEXT_PUBLIC_SITE_NAME}, we use blockchain technology, or rather the <a className="text-neutral-50 underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer nofollow" href="https://ton.org/">Telegram Open Network</a>, to ensure that your certificates are authentic and secure.</p>
            </div>
          </div>

          <div className="lg:col-span-3 group relative flex flex-col justify-between overflow-hidden rounded-xl transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
            <MarqueeCertification />
            <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-neutral-300">Your Certificate &mdash; A Smart Contract</h3>
              <p className=" text-neutral-400 leading-relaxed">Your certificate is more than just a digital badge, but a smart contract, permanently storing your User ID and Course ID. It’s immutable, verifiable, and ensures tamper-proof, decentralized proof of achievement.</p>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default HowItWorks
