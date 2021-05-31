import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = "2018-11-01";
const schedulerData = [
  {
    startDate: "2018-11-01",
    endDate: "2018-11-01T23:59",
    title: "$100",
    available: true,
  },
  {
    startDate: "2018-11-02",
    endDate: "2018-11-02T23:59",
    title: "$150",
    available: true,
  },
  {
    startDate: "2018-11-03",
    endDate: "2018-11-03T23:59",
    title: "$120",
    available: true,
  },
];

export default () => (
  <Paper>
    <Scheduler data={schedulerData} onClick={() => alert()}>
      <ViewState currentDate={currentDate} />
      <MonthView />
      <Appointments />
      <AppointmentTooltip showCloseButton showOpenButton />
      <AppointmentForm onClick={() => alert()} />
    </Scheduler>
  </Paper>
);
