import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selectors";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map(id => data[id])
	);

	const renderedCells = cells.map(cell => {
		return (
			<Fragment key={cell.id}>
				<CellListItem cell={cell} />
				<AddCell previousCellId={cell.id} />
			</Fragment>
		);
	});

	return (
		<div>
			<AddCell
				key={Math.random()}
				forceVisible={cells.length === 0}
				previousCellId={null}
			/>
			{renderedCells}
			
		</div>
	);
};

export default CellList;
