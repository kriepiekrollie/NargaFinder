const date = new Date();
console.log(date.getDay());

const table = document.createElement("table");

const header = document.createElement("tr");

const nargas = [
  "A", 
  "B", 
  "D", 
  "E", 
  "F", 
  "G", 
  "H", 
  "O",
];

const elems = {
  "A": [],
  "B": [], 
  "D": [], 
  "E": [], 
  "F": [], 
  "G": [], 
  "H": [], 
  "O": [],
};

const empty = document.createElement("th");
header.appendChild(empty);

nargas.forEach((narga) => {
  const th = document.createElement("th");
  th.innerText = narga;
  header.appendChild(th);
  elems[narga].push(th);
});

table.appendChild(header);

for (var h = 7; h <= 21; h++) {

  let H1 = String(h).padStart(2, '0');
  let H2 = String(h + 1).padStart(2, '0');

  let t = [
    H1 + ":00 - " + H1 + ":15",
    H1 + ":15 - " + H1 + ":30",
    H1 + ":30 - " + H1 + ":45",
    H1 + ":45 - " + H2 + ":00",
  ];

  for (var m = 0; m < 4; m++) {
    const row = document.createElement("tr");
    const time = document.createElement("td");
    time.innerText = t[m];
    row.appendChild(time);


    nargas.forEach((narga) => {
      const td = document.createElement("td");
      row.appendChild(td);
      elems[narga].push(td);
    });

    table.appendChild(row);
  }
}

const div = document.getElementsByTagName("div")[0];
div.appendChild(table);

function getNargaSchedule(narga, name, week, day) {
  const url = encodeURI("https://84.8.136.28:8080/"
    + "https://splus.sun.ac.za:8081/Reporting/individual?"
    + "idtype=name&" 
    + "objectclass=location&"
    + "template=su+location+individual_eng&"
    + "identifier=" + name + "&"
    + "weeks=" + week
  );

  const options = {
    headers: {
      "Origin": "http://benjaminkleyn.co.za",
    },
  };

  const request = new Request(
    url,
    options
  );

  fetch(request)
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(text => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const tbl = doc.getElementsByClassName("grid-border-args")[0];

      const trs = tbl.children[0].children;

      const hdr = trs[0];
      const header_data = hdr.getElementsByTagName("td");
      const columnDay = [];

      for (let idx = 0, col = 0; idx < header_data.length; idx++) {
        const th = header_data[idx];
        let numColumns = th.attributes.colspan ? th.attributes.colspan.value : 1;
        while (numColumns > 0) {
          columnDay[col] = th.innerText;
          col++;
          numColumns--;
        }
      }
      const Width = columnDay.length;
      const Height = trs.length;

      const booked = [];
      const bookings = [];
      for (let i = 0; i < Height; i++) {
        booked[i] = [];
        bookings[i] = [];
        for (let j = 0; j < Width; j++) {
          booked[i][j] = false;
          bookings[i][j] = [];
        }
      }

      for (var i = 1, j = 0; i < Height; i++) {
        const tds = trs[i].children;

        for (var j = 0, idx = 0; j < Width && idx < tds.length; j++) {
          if (booked[i][j]) {
            continue;
          }

          const td = tds[idx++];

          if (td.classList.contains("object-cell-border")) {

            const cols = td.attributes.colspan ? parseInt(td.attributes.colspan.value) : 1;
            const rows = td.attributes.rowspan ? parseInt(td.attributes.rowspan.value) : 1;

            for (var i2 = i; (i2 < i + rows) && (i2 < Height); i2++) {
              for (var j2 = j; (j2 < j + cols) && (j2 < Width); j2++) {
                booked[i2][j2] = true;
                bookings[i2][j2].push(td.innerText.trim());
              }
            }

          }

        }
      }

      for (var i = 0; i < Height; i++) {
        for (var j = 0; j < Width; j++) {
          if (columnDay[j] === day) {
            if (booked[i][j]) {
              elems[narga][i].classList.add("booked");
              bookings[i][j].forEach(booking => {
                elems[narga][i].innerText += booking + "\n";
              });
            }
          }
        }
      }

    });
}

const days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const day = days[date.getDay()];

// If it works, it works. Shut up.

const weekFirst = [];
const weekLast = []
weekFirst[1] = new Date("2024/01/01"); weekLast[1] = new Date("2024/01/07");
weekFirst[2] = new Date("2024/01/08"); weekLast[2] = new Date("2024/01/14");
weekFirst[3] = new Date("2024/01/15"); weekLast[3] = new Date("2024/01/21");
weekFirst[4] = new Date("2024/01/22"); weekLast[4] = new Date("2024/01/28");
weekFirst[5] = new Date("2024/01/29"); weekLast[5] = new Date("2024/02/04");
weekFirst[6] = new Date("2024/02/05"); weekLast[6] = new Date("2024/02/11");
weekFirst[7] = new Date("2024/02/12"); weekLast[7] = new Date("2024/02/18");
weekFirst[8] = new Date("2024/02/19"); weekLast[8] = new Date("2024/02/25");
weekFirst[9] = new Date("2024/02/26"); weekLast[9] = new Date("2024/03/03");
weekFirst[10] = new Date("2024/03/04"); weekLast[10] = new Date("2024/03/10");
weekFirst[11] = new Date("2024/03/11"); weekLast[11] = new Date("2024/03/17");
weekFirst[12] = new Date("2024/03/18"); weekLast[12] = new Date("2024/03/24");
weekFirst[13] = new Date("2024/03/25"); weekLast[13] = new Date("2024/03/31");
weekFirst[14] = new Date("2024/04/01"); weekLast[14] = new Date("2024/04/07");
weekFirst[15] = new Date("2024/04/08"); weekLast[15] = new Date("2024/04/14");
weekFirst[16] = new Date("2024/04/15"); weekLast[16] = new Date("2024/04/21");
weekFirst[17] = new Date("2024/04/22"); weekLast[17] = new Date("2024/04/28");
weekFirst[18] = new Date("2024/04/29"); weekLast[18] = new Date("2024/05/05");
weekFirst[19] = new Date("2024/05/06"); weekLast[19] = new Date("2024/05/12");
weekFirst[20] = new Date("2024/05/13"); weekLast[20] = new Date("2024/05/19");
weekFirst[21] = new Date("2024/05/20"); weekLast[21] = new Date("2024/05/26");
weekFirst[22] = new Date("2024/05/27"); weekLast[22] = new Date("2024/06/02");
weekFirst[23] = new Date("2024/06/03"); weekLast[23] = new Date("2024/06/09");
weekFirst[24] = new Date("2024/06/10"); weekLast[24] = new Date("2024/06/16");
weekFirst[25] = new Date("2024/06/17"); weekLast[25] = new Date("2024/06/23");
weekFirst[26] = new Date("2024/06/24"); weekLast[26] = new Date("2024/06/30");
weekFirst[27] = new Date("2024/07/01"); weekLast[27] = new Date("2024/07/07");
weekFirst[28] = new Date("2024/07/08"); weekLast[28] = new Date("2024/07/14");
weekFirst[29] = new Date("2024/07/15"); weekLast[29] = new Date("2024/07/21");
weekFirst[30] = new Date("2024/07/22"); weekLast[30] = new Date("2024/07/28");
weekFirst[31] = new Date("2024/07/29"); weekLast[31] = new Date("2024/08/04");
weekFirst[32] = new Date("2024/08/05"); weekLast[32] = new Date("2024/08/11");
weekFirst[33] = new Date("2024/08/12"); weekLast[33] = new Date("2024/08/18");
weekFirst[34] = new Date("2024/08/19"); weekLast[34] = new Date("2024/08/25");
weekFirst[35] = new Date("2024/08/26"); weekLast[35] = new Date("2024/09/01");
weekFirst[36] = new Date("2024/09/02"); weekLast[36] = new Date("2024/09/08");
weekFirst[37] = new Date("2024/09/09"); weekLast[37] = new Date("2024/09/15");
weekFirst[38] = new Date("2024/09/16"); weekLast[38] = new Date("2024/09/22");
weekFirst[39] = new Date("2024/09/23"); weekLast[39] = new Date("2024/09/29");
weekFirst[40] = new Date("2024/09/30"); weekLast[40] = new Date("2024/10/06");
weekFirst[41] = new Date("2024/10/07"); weekLast[41] = new Date("2024/10/13");
weekFirst[42] = new Date("2024/10/14"); weekLast[42] = new Date("2024/10/20");
weekFirst[43] = new Date("2024/10/21"); weekLast[43] = new Date("2024/10/27");
weekFirst[44] = new Date("2024/10/28"); weekLast[44] = new Date("2024/11/03");
weekFirst[45] = new Date("2024/11/04"); weekLast[45] = new Date("2024/11/10");
weekFirst[46] = new Date("2024/11/11"); weekLast[46] = new Date("2024/11/17");
weekFirst[47] = new Date("2024/11/18"); weekLast[47] = new Date("2024/11/24");
weekFirst[48] = new Date("2024/11/25"); weekLast[48] = new Date("2024/12/01");
weekFirst[49] = new Date("2024/12/02"); weekLast[49] = new Date("2024/12/08");
weekFirst[50] = new Date("2024/12/09"); weekLast[50] = new Date("2024/12/15");
weekFirst[51] = new Date("2024/12/16"); weekLast[51] = new Date("2024/12/22");
weekFirst[52] = new Date("2024/12/23"); weekLast[52] = new Date("2024/12/29");

var week = 0;
for (let w = 1; w <= 52; w++) {
  if (weekFirst[w] <= date && date <= weekLast[w]) {
    week = w;
    break;
  }
}

getNargaSchedule("A", "NARGA_A(AdA)_2093", week, day);
getNargaSchedule("B", "NARGA_B(AdA)_2087", week, day);
getNargaSchedule("D", "NARGA_D(Geol)_1005", week, day);
getNargaSchedule("E", "NARGA_E(NS)_3022", week, day);
getNargaSchedule("F", "NARGA_F(NS)_3026", week, day);
getNargaSchedule("G", "NARGA_G(NS)_3019", week, day);
getNargaSchedule("O", "NARGA_O(AdA)_2088", week, day);
