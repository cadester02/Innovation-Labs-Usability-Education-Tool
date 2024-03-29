import { getContextSuite } from "./UIBuilderContextProvider"

import BoneSelector from "./BoneSelector";
import styles from "@/styles/UIBuilder.module.scss"

export default function SolutionViewer(){
  const {solutionGrid, staticWidgets} = getContextSuite();

  return (
    <div className={styles.gridBody}>
      {
        staticWidgets.length > 0 && staticWidgets.map((widget, index) => (
          <div style={widget.style} key={`UIBUILDERSOLUTIONBONE--${index}`}>
            <BoneSelector type={widget.bone}/>
          </div>
        ))
      }

      {solutionGrid.length > 0 && solutionGrid.map((widget, index) => (
        <div style={widget.style} key={`UIBUILDERSOLUTIONBONE--${index}`}>
          <BoneSelector type={widget.bone}/>
        </div>
      ))}
    </div>
  )
}