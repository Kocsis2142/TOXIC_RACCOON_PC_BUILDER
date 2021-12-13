import { Doughnut } from 'react-chartjs-2';

function CreateDoughnutChart({performance1080p, performance1440p, performance2160p}) {

    const data = () => {
        return {
            datasets: [{
                data: [performance1080p, performance1440p, performance2160p],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4,
                offset: 0,
                cutout: 118
              }]
        };
    }

  

    return (
        <div className="doughnut-game-performance-chart">
           <Doughnut className="doughnut-chart" data={data}/>
        </div>
    )
}

export default CreateDoughnutChart