import React from 'react';
import SearchResultList from '../../presentational/SearchResultList';
import SearchContainer from '../../container/SearchContainer';
import {
    Row,
    Col
} from 'react-bootstrap';
import AuthenticationContext from '../../../context/AuthenticationContext';

const TabletMainContainer = ({  
    handleClearButton,
    getSearchKey,
    setMonitor,
    clearAlerts,
    handleClosePath,
    handleShowPath,
    lbeaconPosition,
    geofenceConfig,
    searchedObjectType,
    showedObjects,
    highlightSearchPanel,
    showMobileMap,
    clearSearchResult,
    searchKey,
    searchResult,
    trackingData,
    proccessedTrackingData,
    hasSearchKey,
    setShowedObjects,
    pathMacAddress,
    isHighlightSearchPanel,
    locationMonitorConfig
}) => {

    let auth = React.useContext(AuthenticationContext)

    const style = {
        noResultDiv: {
            color: 'grey',
            fontSize: '1rem',
        },

        pageWrap: {
            overflow: "hidden hidden",
        },

        searchResultDiv: {
            display: hasSearchKey ? null : 'none',
        },

        searchResultList: {
            dispaly: hasSearchKey ? null : 'none',
            maxHeight: '28vh'
        },
    } 

    return (
        <div 
            id="page-wrap" 
            className='mx-1 my-2 overflow-hidden' 
            style={style.pageWrap} 
        >
            <Row 
                id="mainContainer" 
                className='d-flex w-100 justify-content-around mx-0' 
                style={style.container}
            >
                <Col>
                    <SearchContainer 
                        hasSearchKey={hasSearchKey}
                        clearSearchResult={clearSearchResult}
                        auth={auth}
                        getSearchKey={getSearchKey}
                    />                        
                    <div 
                        id='searchResult' 
                        style={style.searchResultDiv} 
                    >
                        <SearchResultList
                            searchResult={searchResult} 
                            searchKey={searchKey}
                            highlightSearchPanel={highlightSearchPanel}
                            handleShowPath={handleShowPath}
                            showMobileMap={showMobileMap}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default TabletMainContainer