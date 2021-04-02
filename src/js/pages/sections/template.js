import { STATION_AMOUNT } from '../../constants/service';
import { optionTemplate } from '../../templates/option';

const sectionAddModalTemplate = `
  <div id="section-add-modal" class="modal">
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🔁 구간 추가</h2>
      </header>
      <form id="section-add-form" class="d-flex flex-col items-center">
        <label for="up-station" class="input-label self-left mb-2 ml-4">상행역</label>
        <select name="up-station-id" id="up-station" class="mb-4" required></select>
        <div class="mx-3 text-2xl mb-4">⬇️</div>
        <label for="down-station" class="input-label self-left mb-2 ml-4">하행역</label>
        <select name="down-station-id" id="down-station" class="mb-4" required></select>
        <div class="input-control mb-4">
          <label for="duration" class="input-label" hidden>소요시간</label>
          <input
            type="number"
            class="input-field mr-4"
            id="duration"
            name="duration"
            placeholder="소요시간"
            min="1"
            required
          />
          <label for="distance" class="input-label" hidden>거리</label>
          <input
            type="number"
            class="input-field"
            placeholder="거리"
            id="distance"
            name="distance"
            min="1"
            required
          />
        </div>
        <div class="d-flex justify-end mt-3">
          <button
            type="submit"
            name="submit"
            class="input-submit js-input-submit bg-cyan-300"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  </div>
`;

const sectionListItem = ({ upStation = {}, downStation = {}, distance = -1, duration = -1 }, isDeletable) => `
  <li
    class="js-section-list-item d-flex items-center relative list-item"
    data-up-station-id="${upStation.id ?? ''}"
    data-up-station-name="${upStation.name ?? ''}"
    data-down-station-id="${downStation.id ?? ''}"
    data-distance="${distance}"
    data-down-station-name="${downStation.name ?? ''}"
    data-duration="${duration}"
  >
    <span class="w-100 pl-6">${upStation.name ?? ''}</span>
   ${
     isDeletable
       ? `<button
            type="button"
            class="list-button js-section-status-button js-section-delete-button section-delete-button"
          >
            ❌
          </button>`
       : ''
   }
    <div class="section-detail">
      ${duration > -1 ? `<div class="section-duration">${duration}</div>` : ''}
      ${distance > -1 ? `<div class="section-distance">${distance}</div>` : ''}
      <div class="section-edit">
        <button
          type="button"
          class="list-button js-section-status-button js-section-add-button section-add-button mr-1"
        >
          ➕
        </button>
      </div>
    </div>
  </li>
`;

export const sectionListItems = sections => {
  const hasMoreSectionsThanMinimum = sections.length > STATION_AMOUNT.MIN + 1;

  return sections
    .map(({ upStation, downStation, distance, duration }, index) =>
      sectionListItem({ upStation, downStation, distance, duration }, index !== 0 && hasMoreSectionsThanMinimum)
    )
    .join('');
};

const sectionsPageTemplate = (lines = []) => `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
          <div class="heading d-flex">
            <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          </div>
          <form class="d-flex items-center pl-1">
            <select id="line-select">
              <option value="" disabled selected hidden>노선 선택</option>
              ${lines.map(({ id, name }) => optionTemplate(id, name)).join('')}
            </select>
          </form>
          <ul class="js-section-list mt-3 pl-0" data-line-id=""></ul>
        </div>
      </main>
    </div>
  </div>
  ${sectionAddModalTemplate}
`;

export default sectionsPageTemplate;
