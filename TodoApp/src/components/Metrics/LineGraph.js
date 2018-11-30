import React from "react";
import { StyleSheet} from "react-native";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory-native";

class LineGraph extends React.Component {
    render() {
      return (
        <VictoryChart
            theme={VictoryTheme.material}
        >
            <VictoryArea
                style={{ data: { fill: "#c43a31" } }}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                data={this.props.data}
                  name="series-1"
            />
         </VictoryChart>

      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });

  export default LineGraph;