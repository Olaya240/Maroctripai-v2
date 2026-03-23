import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Destinations from '../components/Destinations';
import Features from '../components/Features';
import WhyMarocTrip from '../components/WhyMarocTrip';
import Pricing from '../components/Pricing';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <HowItWorks />
            <Destinations />
            <Features />
            <WhyMarocTrip />
            <Pricing />
            <FinalCTA />
            <Footer />
        </div>
    );
}
