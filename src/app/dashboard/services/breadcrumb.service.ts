import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router,
} from "@angular/router";
import { BehaviorSubject, filter } from "rxjs";
import { IBreadcrumb } from "../interfaces/i-breadcrumb";

@Injectable({
  providedIn: "root",
})
export class BreadcrumbService {
  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<IBreadcrumb[]>([]);

  // Observable exposing the breadcrumb hierarchy
  public breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        // Construct the breadcrumb hierarchy
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: IBreadcrumb[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  ngOnInit(): void { }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: IBreadcrumb[]
  ) {
    if (route) {
      // Construct the route URL
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

      if (routeUrl.length > 1 && routeUrl[0] === "dashboard") {
        routeUrl.shift();
      }

      // Add an element for the current route part
      if (route.data["breadcrumb"]) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: routeUrl.join("/"),
        };
        // console.log(routeUrl.join("/").replace(/^\//, ''),);

        breadcrumbs.push(breadcrumb);
      }

      // Add another element for the next route part
      this.addBreadcrumb(route.firstChild!, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: Data) {
    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
    return typeof data["breadcrumb"] === "function"
      ? data["breadcrumb"](data)
      : data["breadcrumb"];
  }
}
