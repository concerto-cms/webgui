import {Component, OnDestroy, OnInit} from '@angular/core';
import {SitesService} from '../../shared/domain/sites.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit, OnDestroy {
    isInitialized = false;
    $site;
    siteSub;
  constructor(
      private sites: SitesService,
  ) {

  }

  ngOnInit() {

      this.$site = this.sites.getActiveSite();
      this.siteSub = this.$site.subscribe((site) => {
          if (!site || !site.name || !site.role) {
              this.isInitialized = false;
              return;
          }
          this.isInitialized = true;
      });
  }

  ngOnDestroy() {
      this.siteSub.unsubscribe();
  }

}
