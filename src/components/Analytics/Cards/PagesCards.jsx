import syr from "../../../assets/images/syr.jpeg";
import syredu from "../../../assets/images/syredu.jpeg";
import bac from "../../../assets/images/bac.jpeg";
import PageCard from "./PageCard";
import useDataContext from "../../../hooks/useDataContext";
const PagesCards = () => {
  const { analytics } = useDataContext();

  const pages = [
    {
      id: 1,
      title: "سوريانا التعليمية",
      image: syredu,
      likes: analytics.syredu[0]?.attributes?.likes,
      endPoint: "syredu",
      date: analytics.syredu[0]?.attributes?.date,
    },
    {
      id: 2,
      title: "بكالوريا سوريا",
      image: bac,
      likes: analytics.bac[0]?.attributes?.likes,
      endPoint: "bac",
      date: analytics.bac[0]?.attributes?.date,
    },
    {
      id: 3,
      title: "سوريا التعليمية",
      image: syr,
      likes: analytics.syr[0]?.attributes?.likes,
      endPoint: "syr",
      date: analytics.syr[0]?.attributes?.date,
    },
  ];

  return (
    <div className="container grid gap-4 mt-10 justify-items-center grid-cols-1 sm:grid-cols-[repeat(2,minmax(300px,_1fr))] lg:sm:grid-cols-[repeat(3,minmax(300px,_1fr))]">
      {pages.map((page) => {
        return (
          <PageCard
            key={page.id}
            image={page.image}
            title={page.title}
            likes={page.likes}
            date={page.date}
            endPoint={page.endPoint}
          />
        );
      })}
    </div>
  );
};

export default PagesCards;
