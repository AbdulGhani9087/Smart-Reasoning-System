import Navbar from "@/components/Navbar";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <section className="hero-gradient px-6 py-16 text-center">
        <h1 className="text-5xl font-black text-gray-950">PlanWise AI Features</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          These are the pages/features needed for your first professional frontend MVP.
        </p>
      </section>
      <FeatureGrid />
      <Footer />
    </>
  );
}
