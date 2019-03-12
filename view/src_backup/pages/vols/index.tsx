import * as React from "react";
import { observer } from "mobx-react";
import { playerStore, volStore } from "../../store";
import { VolItem } from "../../components/vol-item";
import { Pagination } from "../../components/pagination";
import { events, EventTypes } from "../../utils";
import { ViewTypes, VolInfo } from "../../@types";
import "./index.scss";

let volsRef: HTMLDivElement;

function getVolsRef(i: Maybe<HTMLDivElement>) {
  volsRef = i as HTMLDivElement;
}

function renderVols(vols: VolInfo[]) {
  return vols.map((vol: VolInfo, index: number) => (
    <VolItem
      key={vol.id}
      volInfo={vol}
      index={index}
      isPlaying={playerStore.isVolPlaying(vol.id)}
      isLiked={false}
    />
  ));
}

function IVols() {
  const { displayIds } = volStore;

  return (
    <div
      id="vols"
      className={`page show view-${ViewTypes.VOLS}`}
      style={{ zIndex: 1 }}
      ref={getVolsRef}
    >
      {renderVols(displayIds)}
      <Pagination
        pages={volStore.displayPaginations}
        currentPage={volStore.currentPage}
        togglePage={volStore.togglePageIndex}
        paginationCurrentIndex={volStore.paginationCurrentIndex}
        paginationTotalIndex={volStore.paginationTotalIndex}
        onNext={volStore.nextPagination}
        onPre={volStore.prePagination}
      />
    </div>
  );
}

const Vols = observer(IVols);

events.on(EventTypes.ScrollBackVols, (smooth: boolean = false) => {
  if (smooth) {
    volsRef.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  } else {
    volsRef.scrollTo(0, 0);
  }
});

export { Vols };