import React from "react";
import { StyleSheet} from "react-native";
import { VictoryBar, VictoryAxis, VictoryLabel, VictoryChart, VictoryTheme } from "victory-native";

const BarGraph =(props) => {
      return (
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={10}
        >
            <VictoryBar
                style={{ data: { fill: "#c43a31" } }}
                data={props.data}
      
                horizontal={true}
                labels={["M","T","W","Th", "F"]}
                style={{ labels: { fill: "white" } }}
                labelComponent={<VictoryLabel dx={-30}/>}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
            }}
        />
            <VictoryAxis
                    />
            </VictoryChart>

      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });

  export default BarGraph;