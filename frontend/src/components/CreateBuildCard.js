import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom'
import getObjectFromCustomBuild from '../getFunctions/getObjectFromCustomBuild'
import deleteBuild from '../data_fetch/deleteBuildFetch'

function CreateBuildCard({build, loggedInUserName, loggedInUserPrivilege, loggedInUserEmail, componentTypesList, setComponentTypesList, currentBag, setCurrentBag, setBuildIsUpToDate}) {

    const history = useHistory();

    const loadComponentsFromBuild = () => {
        let buildObject = { ...build }
        let ctl = [ ...componentTypesList ]
        let master = []
        buildObject.COMPONENT_LIST.map(component => {
            let obj = {...ctl.find(object => component.keyWord.includes(object.keyWord))}
                if (obj !== undefined) {
                    obj.selected = component.selected
                    obj.name = component.name
                    obj.keyWord = component.keyWord
                    obj.id = uuidv4()
                }
                return master.push(obj)
        })
        setComponentTypesList(master)
        history.push(`/pcbuilder`);
        window.scrollTo(0, 0)
    }

    const deleteBuildHandler = () => {
        deleteBuild(build.BUILD_ID, loggedInUserPrivilege)
        setBuildIsUpToDate(false)
    }

    const addToBagHandler = () => {
        setCurrentBag([...currentBag, getObjectFromCustomBuild(build.BUILD_PRICE, build.COMPONENT_LIST, build.BUILD_NAME)])
    }
    
    return (
        <div className="build-card">
            <ul>
                <li className="image-container"><img width="300px" src={build.COMPONENT_LIST.find(component => component.keyWord === "CASE").selected.IMG} alt="build_case_pic"/></li>
            </ul>
            <ul>
                <li>{build.BUILD_NAME}</li>
                <li>Created by: {build.USER_NAME}</li>
                <li>Price: {build.BUILD_PRICE} Ft</li>
                <li>
                    <ul>{build.COMPONENT_LIST.map((component, index) =>
                         <li key={index}>
                             <ul>
                                 <li>{component.name}: {component.selected.TYPE}</li>
                             </ul>
                        </li>)}
                    </ul>
                </li>
            </ul>
            <ul>
                <li><button className="hover-btn" onClick={loadComponentsFromBuild}>Use this build in PC Builder</button></li>
                <li><button className="hover-btn" onClick={addToBagHandler}>Add to bag</button></li>
                {build.USER_NAME === loggedInUserName && build.USER_EMAIL === loggedInUserEmail && <li><button className="hover-btn" onClick={deleteBuildHandler}>Delete Build</button></li>}
            </ul>
        </div>
    )
}

export default CreateBuildCard