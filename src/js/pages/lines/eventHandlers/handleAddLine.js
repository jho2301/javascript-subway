import store from '../../../store';
import { addLineListItem } from '../viewController';
import { $ } from '../../../utils/dom';
import { closeModal } from '../../../utils/modal';
import { STATION_AMOUNT } from '../../../constants/service';
import { requestAddLine } from '../../../api/line';
import { LINE } from '../../../constants/alertMessage';

const handleAddLine = async event => {
  event.preventDefault();

  if (store.station.length < STATION_AMOUNT.MIN) {
    alert(LINE.TOO_FEW_STATION);
    return;
  }

  const {
    ['subway-line-name']: name,
    ['up-station']: upStationId,
    ['down-station']: downStationId,
    ['subway-line-color']: color,
    duration,
    distance,
  } = event.target.elements;

  const result = await requestAddLine({
    name: name.value,
    upStationId: Number(upStationId.value),
    downStationId: Number(downStationId.value),
    distance: distance.valueAsNumber,
    color: color.value,
    duration: duration.valueAsNumber,
  });

  if (!result.success) {
    alert(result.message);
    return;
  }

  store.line.add(result.data);
  addLineListItem(result.data);
  closeModal($('#line-add-modal'));
  event.target.reset();
};

export default handleAddLine;
