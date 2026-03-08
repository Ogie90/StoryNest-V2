import MobileFrame from "@/components/storynest/MobileFrame";
import HomeScreen from "@/components/storynest/screens/HomeScreen";
import BookDetailScreen from "@/components/storynest/screens/BookDetailScreen";
import ReaderScreen from "@/components/storynest/screens/ReaderScreen";

const ProductShowcase = () => (
  <section id="showcase" className="py-16 lg:py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-4">
        A Glimpse Inside StoryNest
      </h2>
      <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">
        Browse, discover, and read beautifully crafted stories — all personalized for your child.
      </p>

      <div className="flex justify-start lg:justify-center gap-4 lg:gap-10 overflow-x-auto pb-4 px-5 lg:px-0 scrollbar-hide snap-x snap-mandatory lg:snap-none -mx-5 lg:mx-0">
        <div className="shrink-0 snap-center transform scale-[0.72] sm:scale-[0.8] lg:scale-[0.85] origin-top ml-4 lg:ml-0">
          <MobileFrame>
            <HomeScreen />
          </MobileFrame>
        </div>
        <div className="shrink-0 snap-center transform scale-[0.72] sm:scale-[0.8] lg:scale-[0.85] origin-top">
          <MobileFrame>
            <BookDetailScreen />
          </MobileFrame>
        </div>
        <div className="shrink-0 snap-center transform scale-[0.72] sm:scale-[0.8] lg:scale-[0.85] origin-top mr-4 lg:mr-0">
          <MobileFrame>
            <ReaderScreen />
          </MobileFrame>
        </div>
      </div>
    </div>
  </section>
);

export default ProductShowcase;
