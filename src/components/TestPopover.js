// export default function CustomPopover(){ return(<div>ERC Percentiles</div>)}
import {MapPopoverFactory} from 'kepler.gl/components';
import LayerHoverInfoFactory from './layer-hover-info';
import CoordinateInfoFactory from './coordinate-info';

// MapPopoverFactory.deps = [LayerHoverInfoFactory, CoordinateInfoFactory];

export function CustomPopover(){
	const layerHoverInfo = LayerHoverInfoFactory()
	const layerCoordinateInfo = CoordinateInfoFactory()
	const pop = MapPopoverFactory(layerHoverInfo, layerCoordinateInfo)
	 return pop
} 