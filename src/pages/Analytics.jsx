import AddAnalytics from "../components/Analytics/Add/AddAnalytics";
import AnalyticsTable from "../components/Analytics/Table/AnalyticsTable";
import MonthlyAnalytics from "../components/Analytics/Monthly/MonthlyAnalytics";
import PagesCards from "../components/Analytics/Cards/PagesCards";
import transition from "../transition";

const Analytics = () => {
  return (
    <div className="container mx-auto px-[4%]">
      <AddAnalytics />
      <PagesCards />
      <AnalyticsTable social={"Facebook"} />
      <AnalyticsTable social={"Telegram"} />
      <MonthlyAnalytics />
    </div>
  );
};

export default transition(Analytics);
