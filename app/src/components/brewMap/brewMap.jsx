import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapGl, { Marker, Popup } from "react-map-gl";

class BrewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewPort: {
        latitude: Number(this.props.brewery[0].latitude),
        longitude: Number(this.props.brewery[0].longitude),
        width: "100vw",
        height: "100vh",
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
    if (prevProps.brewery.length > 1) {
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
              >
                <div className="popup-info">
                  <h3>Name: {selectedPub.name}</h3>
                  <p>Street: {selectedPub.street}</p>
                  <p>Phone: {selectedPub.phone}</p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGl>
        ) : null}
      </div>
    );
  }
}
const mapState = (state) => ({
  brewery: state.breweryData.brews,
});
export default connect(mapState, null)(BrewMap);
