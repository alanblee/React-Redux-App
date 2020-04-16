import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import BrewPub from "./selectedBrew";
import "./brewMap.scss";
class BrewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewPort: {
        latitude: Number(this.props.brewery[0].latitude),
        longitude: Number(this.props.brewery[0].longitude),
        width: "50vw",
        height: "50vh",
        zoom: 10,
      },
      selectedPub: null,
    };
  }
  componentDidMount() {
    const { brewery } = this.props;
    const { viewPort } = this.state;

    if (brewery.length > 1) {
      this.setState({
        ...viewPort,
        latitude: Number(this.props.brewery[0].latitude),
        longitude: Number(this.props.brewery[0].longitude),
        zoom: 10,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.brewery.length) {
      if (this.props.brewery[0].latitude !== prevProps.brewery[0].latitude) {
        if (prevProps.brewery[0].latitude) {
          this.setState({
            viewPort: {
              ...this.state.viewPort,
              latitude: Number(this.props.brewery[0].latitude)
                ? Number(this.props.brewery[0].latitude)
                : Number(this.props.brewery[1].latitude),
              longitude: Number(this.props.brewery[0].longitude)
                ? Number(this.props.brewery[0].longitude)
                : Number(this.props.brewery[1].longitude),
              zoom: 10,
            },
          });
        }
      }
    }
  }

  selectPub = (pub) => {
    this.setState({
      selectedPub: pub,
    });
  };
  render() {
    const { brewery } = this.props;
    const { viewPort, selectedPub } = this.state;
    return (
      <div className="map-container">
        {brewery.length ? (
          <div className="map"> 
          <ReactMapGl
            {...viewPort}
            mapStyle="mapbox://styles/alanblee35/ck91u2y2b01j91ip89q563ix3"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(viewPort) => {
              this.setState({
                viewPort,
              });
            }}
          >
            {brewery.map((pubs) => {
              return (
                <Marker
                  key={pubs.id}
                  latitude={Number(pubs.latitude)}
                  longitude={Number(pubs.longitude)}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.selectPub(pubs);
                    }}
                  >
                    <i className="fas fa-beer"></i>
                  </button>
                </Marker>
              );
            })}
            {selectedPub ? (
              <Popup
                latitude={Number(selectedPub.latitude)}
                longitude={Number(selectedPub.longitude)}
                onClose={() => {
                  this.setState({
                    selectedPub: null,
                  });
                }}
              >
                <div className="popup-info">
                  <h3>{selectedPub.name}</h3>
                  <p> {selectedPub.street}</p>
                  <p>{selectedPub.phone}</p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGl>
          </div>
        ) : null}
        {selectedPub ? <BrewPub selectedPub={selectedPub} /> : <div className="hide"></div>}
      </div>
    );
  }
}
const mapState = (state) => ({
  brewery: state.breweryData.brews,
});
export default connect(mapState, null)(BrewMap);
