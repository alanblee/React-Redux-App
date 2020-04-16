import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapGl, { Marker } from "react-map-gl";

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
  render() {
    const { brewery } = this.props;
    const { viewPort } = this.state;
    return (
      <div>
        {brewery.length > 1 ? (
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
                  <button>
                    <i className="fas fa-beer"></i>
                  </button>
                </Marker>
              );
            })}
          </ReactMapGl>
        ) : (
          <ReactMapGl
            {...viewPort}
            mapStyle="mapbox://styles/alanblee35/ck91u2y2b01j91ip89q563ix3"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(viewPort) => {
              this.setState({
                viewPort,
              });
            }}
          ></ReactMapGl>
        )}
      </div>
    );
  }
}
const mapState = (state) => ({
  brewery: state.breweryData.brews,
});
export default connect(mapState, null)(BrewMap);
