import CreateDoughnutChart from './CreateDoughnutChart'

function CreateGamePerformanceCard({componentTypesList, gameName, gamePic, gameObject}) {

    const selectedVga = componentTypesList.find(comp => comp.keyWord === "GPU") !== undefined && componentTypesList.find(comp => comp.keyWord === "GPU").selected

    const calculateBottleneck = (resolution) => {
        let selectedGpu = componentTypesList.find(comp => comp.keyWord === "GPU")
        let selectedCpu = componentTypesList.find(comp => comp.keyWord === "CPU")
        let selectedRam = componentTypesList.find(comp => comp.keyWord === "RAM")

        if (selectedGpu !== undefined && selectedGpu.selected.GAMING_SCORE !== undefined &&
            selectedCpu !== undefined && selectedCpu.selected.GAMING_SCORE !== undefined &&
            selectedRam !== undefined && selectedRam.selected.GAMING_SCORE !== undefined) {
                if (selectedCpu.selected.GAMING_SCORE < selectedGpu.selected.GAMING_SCORE * 0.1) {
                    if (selectedRam.selected.GAMING_SCORE > 50000) {
                        let multiplier = (((selectedRam.selected.GAMING_SCORE - 50000) / 5000) * 0.01) + 1
                        return ((selectedCpu.selected.GAMING_SCORE / (selectedGpu.selected.GAMING_SCORE * 0.1)) * selectedGpu.selected[resolution][gameObject] * multiplier).toFixed(0)
                  } else if (selectedRam.selected.GAMING_SCORE < 50000) {
                        let multiplier = 1 - (((50000 - selectedRam.selected.GAMING_SCORE) / 5000) * 0.01)
                        return ((selectedCpu.selected.GAMING_SCORE / (selectedGpu.selected.GAMING_SCORE * 0.1)) * selectedGpu.selected[resolution][gameObject] * multiplier).toFixed(0)
                    }
                    return ((selectedCpu.selected.GAMING_SCORE / (selectedGpu.selected.GAMING_SCORE * 0.1)) * selectedGpu.selected[resolution][gameObject]).toFixed(0)
                } else {
                    if (selectedRam.selected.GAMING_SCORE > 50000) {
                        let multiplier = (((selectedRam.selected.GAMING_SCORE - 50000) / 5000) * 0.01) + 1
                        return (selectedGpu.selected[resolution][gameObject] * multiplier).toFixed(0)
                    } else if (selectedRam.selected.GAMING_SCORE < 50000) {
                        let multiplier = 1 - (((50000 - selectedRam.selected.GAMING_SCORE) / 5000) * 0.01)
                        return (selectedGpu.selected[resolution][gameObject] * multiplier).toFixed(0)
                    }
                   return (selectedGpu.selected[resolution][gameObject]).toFixed(0)
                }
            }
        }

    return (
            <div className="game-performance-card">
                <h1 className="game-name">{gameName}</h1>
                <div className="game-image-container"><img className="game-image" src={gamePic} alt="game_image"/></div>
                {selectedVga.FPS_RES_1080P !== undefined &&
                    <CreateDoughnutChart
                    performance1080p={calculateBottleneck("FPS_RES_1080P")}
                    performance1440p={calculateBottleneck("FPS_RES_1440P")}
                    performance2160p={calculateBottleneck("FPS_RES_2160P")}
                    />}
                {selectedVga.FPS_RES_1080P !== undefined ? 
                <p className="game-performance">1080p Ultra Settings: {calculateBottleneck("FPS_RES_1080P")} FPS</p> : 
                <p className="game-performance">1080p Ultra Settings: Calculation will done automatically after you selected more components!</p>
                }
                {selectedVga.FPS_RES_1440P !== undefined ?
                <p className="game-performance">1440p Ultra Settings: {calculateBottleneck("FPS_RES_1440P")} FPS</p> : 
                <p className="game-performance">1440p Ultra Settings: Calculation will done automatically after you selected more components!</p>}
                {selectedVga.FPS_RES_2160P !== undefined ? 
                <p className="game-performance">2160p Ultra Settings: {calculateBottleneck("FPS_RES_2160P")} FPS</p> : 
                <p className="game-performance">2160p Ultra Settings: Calculation will done automatically after you selected more components!</p>}
            </div>
    )
}

export default CreateGamePerformanceCard