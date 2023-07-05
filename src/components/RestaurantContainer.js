import { useState } from "react";
import { Link } from "react-router-dom";

import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimeer";
import useRestaurantCards from "../../utils/hooks/useRestaurantCards";
import useOnlineStatus from "../../utils/hooks/useOnlineStatus";

const ResaturantContainer = () => {
    const [listOfFilteredRestaurants, setListOfFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const listOfRestaurants = useRestaurantCards(setListOfFilteredRestaurants);
    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) {
        return <section className="flex items-center h-full sm:p-16 bg-gray-50 text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 text-gray-400">
                    <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                    <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                    <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                    <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                </svg>
                <p className="text-3xl">Looks like you are offline</p>
            </div>
        </section>
    }
    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <>
            <h3 className='mt-4 mb-2 text-4xl tracking-tight font-bold text-center text-red-800' id="restaurants">Top Restaurants</h3>
            <hr class="w-[275] h-1 mx-auto bg-gray-400 border-0 rounded"></hr>

            <div className="mx-auto">
                <div className="serch-box flex flex-col items-center sm:justify-between sm:flex-row p-5 mx-24 max-sm:pb-0 gap-3">
                    {/* Search field */}
                    <div className="search max-sm:flex max-sm:flex-col max-sm:items-center">
                        <input value={searchText} onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                            type="text" name="search" id="search" placeholder="SEARCH" className="outline-none shadow shadow-red-800 p-2 max-sm:mb-2" />
                        <button onClick={() => {
                            console.log(searchText);
                            const searchRestaurant = listOfRestaurants.filter(restaurant => (
                                restaurant.data.name.toLowerCase().includes(searchText.toLowerCase())
                            ))
                            setListOfFilteredRestaurants(searchRestaurant)

                        }} type="submit" className="items-center bg-green-700 p-1 mx-4 rounded-md text-white hover:bg-red-600 hover:shadow hover:shadow-red-800 transition ease-linear duration-200">Search</button>
                    </div>

                    {/* filter button */}
                    <button type="button" className="bg-green-700 p-2 rounded-md text-white hover:bg-red-600 hover:shadow hover:shadow-red-800 transition ease-linear duration-200 max-sm:whitespace-nowrap"
                        onClick={() => {
                            const filteredList = listOfFilteredRestaurants.filter(
                                (restaurant) => restaurant.data.avgRating >= 4
                            )
                            setListOfFilteredRestaurants(filteredList);
                        }}>
                        Filter Top Rated Restaurants
                    </button>
                </div >

                {/* cards container */}
                <div className="res-container flex justify-center flex-row flex-wrap">
                    {
                        listOfFilteredRestaurants.map((restaurant) => {
                            return (
                                <Link key={restaurant.data.id} to={'/restaurants/' + restaurant.data.id} className="card sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 m-3 w-fit border border-grey rounded-md shadow-black shadow-md hover:shadow-lg hover:shadow-black">
                                    < RestaurantCard resData={restaurant} />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default ResaturantContainer;