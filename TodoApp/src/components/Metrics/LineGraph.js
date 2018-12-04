import React from "react";
import { StyleSheet} from "react-native";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme } from "victory-native";

let loading = true;
const processData = (data) =>{
    let processedData = [];
    for(let i = 0; i < data.length; i++){
        processedData.push({y: data[i].soFar, x: data[i].dateUpdated});
    }
    loading = false;
    return processedData;
}


class LineGraph extends React.Component {
  state={
    data: []
  }
  componentDidMount(){
    this.setState({data: processData(this.props.data)});
  }
    render() {
      return (
        <VictoryChart
            theme={VictoryTheme.material}
        >
        {!loading &&
          <VictoryArea
          domain={{y: [0, this.props.maxY]}}
          style={{ data: { fill: "#F6D258" } }}
          animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
          data={this.state.data}
            name="series-1"
      />
        }
        <VictoryAxis
        scale={{x: 'time'}}
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