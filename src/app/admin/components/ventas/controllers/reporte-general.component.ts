import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { PowerBIReportEmbedComponent } from "powerbi-client-angular";
import "powerbi-report-authoring";
import { PowerbiService } from "../../../services/powerbi.service";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from '@auth0/angular-jwt';
import { IReportEmbedConfiguration, models, service } from "powerbi-client";
import moment from "moment-timezone";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: 'app-reporte-general',
  templateUrl: '../views/reporte-general.component.html',
  styleUrl: '../styles/reporte-general.component.scss'
})
export class ReporteGeneralComponent {
  @ViewChild(PowerBIReportEmbedComponent)
  reportObj!: PowerBIReportEmbedComponent;

  datosCargados: boolean = false;

  displayMessage =
    "The report is bootstrapped. Click Embed Report button to set the access token.";

  reportClass = "report-container";

  phasedEmbeddingFlag = false;
  isMobile: boolean = false;

  reportConfig: IReportEmbedConfiguration = {
    type: "report",
    id: "",
    embedUrl: "",
    accessToken: "",
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false
        }
      },
      layoutType: this.isMobile? models.LayoutType.MobilePortrait : models.LayoutType.Master,
      background: models.BackgroundType.Transparent,
      navContentPaneEnabled: false,
    },
    pageName: environment.powerbiConfig.ventasReporteGeneral
  };

  eventHandlersMap = new Map<
    string,
    (event?: service.ICustomEvent<any>) => void
  >([
    /* ['loaded', () => console.log('Report loaded')], */
    ['rendered', async () => this.spinner.hide()],
    ['error', (event) => console.log(event?.detail)]
  ]);

  token: any = localStorage.getItem('powerbi_report_token');

  constructor(
    public httpService: PowerbiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
        if (this.token) {
          let parse = JSON.parse(this.token);
          let expiry = moment(parse.expiry).tz("America/Guayaquil").format();
          let now = moment().format();
          if (expiry < now) {
            this.embedReport();
          } else {
            this.reportConfig = {
              type: "report",
              id: parse.embedUrl[0].reportId? parse.embedUrl[0].reportId : "",
              embedUrl: parse.embedUrl[0].embedUrl? parse.embedUrl[0].embedUrl : "",
              accessToken: parse.accessToken? parse.accessToken : "",
              tokenType: models.TokenType.Embed,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false
                  }
                },
                layoutType: this.isMobile? models.LayoutType.MobilePortrait : models.LayoutType.Master,
                background: models.BackgroundType.Transparent,
                navContentPaneEnabled: false,
              },
              pageName: environment.powerbiConfig.ventasReporteGeneral
            }
            this.datosCargados = true;
          }
        }
      });
  }

  async ngAfterViewInit(): Promise<void> {
    this.spinner.show();
    if(!this.token) {
      this.embedReport();
    } else if (this.token) {
      let parse = JSON.parse(this.token);
      let expiry = moment(parse.expiry).tz("America/Guayaquil").format();
      let now = moment().format();
      if (expiry < now) {
        this.embedReport();
      }
    }
  }

  async embedReport(): Promise<void> {
    try {
      this.breakpointObserver
      .observe('(max-width: 768px)')
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
        const reportUrl = environment.apiConfig.serverTokenUrl;
        this.httpService.getEmbedConfig(reportUrl).subscribe({
          next: (response) => {
            this.reportConfig = {
              ...this.reportConfig,
              id: response.embedUrl[0].reportId,
              embedUrl: response.embedUrl[0].embedUrl,
              accessToken: response.accessToken,
              settings: {
                ...this.reportConfig.settings,
                layoutType: this.isMobile? models.LayoutType.MobilePortrait : models.LayoutType.Master,
              }
            };
            localStorage.setItem('powerbi_report_token', JSON.stringify(response));
            this.datosCargados = true;
          },
          error: (error) => {
            console.log(error);
            this.toastr.error("Ha habido un error al obtener el token", "Error PowerBI", {
              progressBar: true
            })
            this.spinner.hide();
          },
        });
      });
    } catch (error) {
      /* this.displayMessage = `Failed to fetch config for report. ${JSON.parse(error)}`; */
      console.error(this.displayMessage);
      return;
    }
  }
}
