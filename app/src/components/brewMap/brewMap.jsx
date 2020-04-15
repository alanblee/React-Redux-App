import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapGl from "react-map-gl";

class BrewMap extends Component {
  constructor() {
    super();
    this.state = {
      viewPort: {
        latitude: 39.9997,
        longitude: -98.6785,
        width: "50vw",
        height: "50vh",
        zoom: 3,
      },
    };
  }
  // componentDidUpdate(prevProps) {
  //   // console.log(prevProps.brewery);
  //   if (prevProps.brewery.length > 1) {
  //     if (this.props.brewery[0].latitude !== prevProps.brewery[0].latitude) {
  //       console.log(this.props.brewery[0].latitude)
  //       this.setState({
  //         viewPort: {
  //           ...this.state.viewPort,
  //           latitude: this.props.brewery[0].latitude,
  //           longitude: this.props.brewery[0].longitude,
  //           zoom: 10,
  //         },
  //       });
  //     }
  //   }
  // }
  render() {
    const { brewery } = this.props;
    const { viewPort } = this.state;
    return (
      <div>
        {brewery.length > 1 && (
          <ReactMapGl
            {...viewPort}
            mapStyle="mapbox://styles/alanblee35/ck91u2y2b01j91ip89q563ix3"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(viewPort) => {
              console.log(viewPort);
              this.setState({
                viewPort,
              });
            }}
          >
            markers here
          </ReactMapGl>
        )}
      </div>

      // <ReactMapGl
      //   {...viewPort}
      //   mapStyle="mapbox://styles/alanblee35/ck91u2y2b01j91ip89q563ix3"
      //   mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //   onViewportChange={(viewPort) => {
      //     console.log(viewPort);
      //     this.setState({
      //       viewPort,
      //     });
      //   }}
      // >
      //   markers here
      // </ReactMapGl>
    );
  }
}
const mapState = (state) => ({
  brewery: state.breweryData.brews,
});
export default connect(mapState, null)(BrewMap);
