import BarChart from './components/BarChart';
import './dist/output.css';

function App() {
    // const [userData, setUserData] = useState({});

    // const getData = async () => {
    //     const response = await axios.get(
    //         'https://gateway.smart-cimb.com/v1/nocode/check/monitor-by-automation'
    //     );

    //     // testing = response;
    //     // return response.data;
    //     setUserData({
    //         labels: response.data.map((data) => data.name),
    //         datasets: [
    //             {
    //                 label: 'Total No-code Automation',
    //                 data: response.data.map((data) => data.total)
    //             }
    //         ]
    //     });
    // };
    // // console.log(getData());
    // useEffect(() => {
    //     getData();
    // }, [userData]);

    return (
        <div className="container mx-auto">
            <h1 className="text-center font-bold text-3xl mt-3 text-slate-800">
                Monitoring Automation CIMB Production
            </h1>
            <BarChart />
        </div>
        // <h1 className="text-3xl font-bold underline">Hello world!</h1>
    );
    // return <>{/* <p>Tesss</p> */}</>;
}

export default App;
