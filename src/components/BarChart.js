import { Bar } from "react-chartjs-2";

function BarChart(props) {
	
return (
	<div className="container5 mt-5">
	<h4>Number Of Asteroids passing each day chart</h4>
	
	<div style={{ maxWidth: "600px" }}>
		<Bar
		data={{
			labels:props.eElement,
			
			datasets: [
			{
				label: "No of Asteroids",
				data: props.Ddata,
				backgroundColor: ["#7DF9FF","#7DF9FF","#7DF9FF","#7DF9FF","#7DF9FF","#7DF9FF","#7DF9FF"],
				borderColor: ["white", "white", "white", "white","white","white","white"],
				borderWidth: 0,
			
			},
			],
		}}
		height={400}
		options={{
			maintainAspectRatio: false,
			scales: {
			yAxes: [
				{
				ticks: {
					beginAtZero: true,
				},
				},
			],
			},
			legend: {
			labels: {
				fontSize: 20,
    
			},
			},
		}}
		/>
	</div>
	</div>
);
}

export default BarChart;
