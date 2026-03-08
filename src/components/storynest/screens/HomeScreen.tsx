import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SectionHeader from "../SectionHeader";
import StoryCard from "../StoryCard";
import AuthorAvatar from "../AuthorAvatar";
import CategoryChip from "../CategoryChip";

const books = [
  { title: "Luna and the Moonlit Garden", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center", chapters: 12 },
  { title: "The Brave Little Fox", image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=300&h=400&fit=crop&crop=center", chapters: 8 },
  { title: "Ocean of Whispers", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=400&fit=crop&crop=center", chapters: 15 },
  { title: "The Dragon's Lullaby", image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&h=400&fit=crop&crop=center", chapters: 10 },
];

const authors = [
  { name: "Emma R.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { name: "Liam K.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Sophie M.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { name: "Noah T.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
];

const categories = ["All", "Adventure", "Animal", "Fantasy", "Nature", "Space"];

const bottomCards = [
  { title: "The Enchanted Treehouse", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=250&fit=crop&crop=center", chapters: 6 },
  { title: "Stars Above the Meadow", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=250&fit=crop&crop=center", chapters: 9 },
];

const HomeScreen = () => (
  <div className="h-full overflow-y-auto bg-gradient-to-b from-card via-card to-muted">
    {/* Header */}
    <div className="flex items-center justify-between px-5 pt-2 pb-3">
      <div>
        <h2 className="text-xl font-bold text-foreground tracking-tight">StoryNest</h2>
        <p className="text-[11px] text-muted-foreground">Good morning, little reader ✨</p>
      </div>
      <Avatar className="w-9 h-9 ring-2 ring-primary/30">
        <AvatarImage src="https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=80&h=80&fit=crop&crop=face" alt="Profile" />
        <AvatarFallback className="bg-accent-lavender text-foreground text-sm">A</AvatarFallback>
      </Avatar>
    </div>

    {/* Recommendations */}
    <div className="px-5 mb-5">
      <SectionHeader title="Recommendations" action="See all" className="mb-3" />
      <div className="flex gap-3 overflow-x-auto pb-2 -mr-5 pr-5 scrollbar-hide">
        {books.map((book) => (
          <StoryCard key={book.title} {...book} />
        ))}
      </div>
    </div>

    {/* Top Authors */}
    <div className="px-5 mb-5">
      <SectionHeader title="Top Authors" action="View all" className="mb-3" />
      <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
        {authors.map((author) => (
          <AuthorAvatar key={author.name} {...author} />
        ))}
      </div>
    </div>

    {/* Categories */}
    <div className="px-5 mb-5">
      <SectionHeader title="Categories" className="mb-3" />
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat, i) => (
          <CategoryChip key={cat} label={cat} active={i === 0} />
        ))}
      </div>
    </div>

    {/* Bottom Story Cards */}
    <div className="px-5 pb-6 flex flex-col gap-3">
      {bottomCards.map((card) => (
        <StoryCard key={card.title} {...card} size="lg" />
      ))}
    </div>
  </div>
);

export default HomeScreen;
