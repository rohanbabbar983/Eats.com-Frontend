import Landing from "../assets/landing.png"
import AppImg from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
      navigate({
        pathname: `/search/${searchFormValues.searchQuery}`,
      });
    };

  return(
    <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-white rounded-lg gap-5 text-center -mt-16 flex flex-col shadow-md py-8">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeway today
                </h1>
                <span className="text-xl">Your food is just a click away!</span>
         <SearchBar
          placeHolder="Search by City or Town..."
          onSubmit={handleSearchSubmit}
        />        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img src={Landing} />
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-4xl tracking-tighter">
                    Order takeway even faster!
                </span>
                <span>
                    Download the Eats.com app for faster ordering and more personalised recommendations
                </span>
                <img src={AppImg} alt="" />

            </div>
            
        </div>

    </div>
  )
};

export default HomePage;