import Categorie from "./Categorie";
import FeaturedListings from "./FeaturedListings";
import FeatureProperties from "./FeatureProperties";
import FilteringItem from "./FilteringItem";

const SidebarListing = ({data}) => {
    return (
        <div className="sidebar_listing_grid1">
            <div className="sidebar_listing_list">
                <div className="sidebar_advanced_search_widget">
                    <FilteringItem data={data}/>
                </div>
            </div>
            {/* End .sidebar_listing_list */}

            <div className="terms_condition_widget">
                <h4 className="title">Featured Properties</h4>
                <div className="sidebar_feature_property_slider">
                    <FeatureProperties data={data}/>
                </div>
            </div>
            {/* End .Featured Properties */}

            <div className="terms_condition_widget">
                <h4 className="title">Categories Property</h4>
                <div className="widget_list">
                    <ul className="list_details">
                        <Categorie data={data}/>
                    </ul>
                </div>
            </div>
            {/* End .Categories Property */}

            <div className="sidebar_feature_listing">
                <h4 className="title">Recently Viewed</h4>
                <FeaturedListings data={data}/>
            </div>
            {/* End .Recently Viewed */}
        </div>
    );
};

export default SidebarListing;
