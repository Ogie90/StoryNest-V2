import MobileFrame from "@/components/storynest/MobileFrame";
import HomeScreen from "@/components/storynest/screens/HomeScreen";
import BookDetailScreen from "@/components/storynest/screens/BookDetailScreen";
import ReaderScreen from "@/components/storynest/screens/ReaderScreen";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10 max-w-[1280px]">
        <MobileFrame>
          <HomeScreen />
        </MobileFrame>
        <MobileFrame>
          <BookDetailScreen />
        </MobileFrame>
        <MobileFrame>
          <ReaderScreen />
        </MobileFrame>
      </div>
    </div>
  );
};

export default Index;
