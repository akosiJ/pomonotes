# Pomonotes AI Coding Guidelines

## Project Overview
**Pomonotes** is an Angular 21 + Firebase authentication web application with a dashboard featuring collapsible sidebars. Architecture uses standalone components, signals for state, and RxJS observables in services.

## Architecture & Key Components

### Stack
- **Framework**: Angular 21 (standalone components, no NgModules)
- **State**: Angular Signals (new state API) + RxJS BehaviorSubjects in services
- **UI**: PrimeNG components + PrimeFlex grid + Tailwind CSS
- **Auth**: Firebase Auth with email/password and Google OAuth
- **Testing**: Vitest (not Jasmine) + Angular TestBed

### Page Structure
```
Landing → Login/Register → Dashboard (protected by authGuard)
                              ├── Left Sidebar (notes list)
                              ├── Main Content (note editor)
                              └── Right Sidebar (metadata/properties)
```

### Critical Authentication Pattern
- **Auth Service** (`src/app/services/auth.ts`): Wraps Firebase auth with a `user` signal and a `ready` Promise
- **readiness pattern**: Routes guard (`authGuard`) awaits `auth.ready` before checking login state, preventing premature redirects while Firebase restores persisted sessions
- **Route Config** (`app.routes.ts`): Dashboard protected by `canActivate: [authGuard]`; default route redirects to dashboard

### State Management Hybrid
- **Signals** for component-level state (e.g., `isLeftPaneCollapsed`, `error`)
- **BehaviorSubjects** in services for multi-component state (e.g., `DashboardService` manages pane visibility across Dashboard, LeftSidebar, MainContent, RightSidebar)
- Always use `asObservable()` when exposing observables from services

## Developer Workflows

### Start Development Server
```bash
npm start
# or: ng serve
```
Server runs on `http://localhost:4200` with hot reload on file changes.

### Run Tests
```bash
npm test
# Runs Vitest (not Jasmine) via Angular TestBed
```
- Tests files: `*.spec.ts` (excluded from app build via tsconfig.app.json)
- Component fixture tests use `await fixture.whenStable()` pattern
- Mock Firebase or use TestBed injection for services

### Build for Production
```bash
npm run build
# Output: dist/pomonotes/
```
Production mode optimizes for bundle size and performance.

### Code Generation
Use Angular CLI schematics:
```bash
ng generate component pages/my-page/my-page
ng generate service services/my-service
```
Schematic prefix: `app` (e.g., `<app-my-page>`).

## Code Patterns & Conventions

### Components
- **Standalone**: All components use `standalone: true` + `imports: [...]`
- **Signals**: Use Angular signals for component state (call as functions: `mySignal()`)
- **Template**: `.html` files with standalone imports; use `CommonModule` for `*ngIf`, `*ngFor`
- **Styles**: Scoped CSS in `.css` files (not global), can use Tailwind classes inline

### Services
- Decorate with `@Injectable({ providedIn: 'root' })` for tree-shaking
- Expose BehaviorSubjects as read-only observables: `fieldName$ = this.subject.asObservable()`
- Include getter methods for synchronous access to current values
- Document initialization logic (e.g., Firebase setup, auth state restoration) in comments

### Async/Await Patterns
- Prefer `async/await` over `.subscribe()` in components (cleaner code)
- Auth service methods return Promises (e.g., `signIn(email, password)`)
- Use `.whenStable()` in tests to wait for async operations

### TypeScript Configuration
- **Strict mode**: `"strict": true` enabled (no implicit `any`)
- **No template errors**: `"strictTemplates": true` in Angular compiler options
- Target: **ES2022**, **module: "preserve"**

## Testing Conventions

### Test Setup
```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({ imports: [MyComponent] }).compileComponents();
  fixture = TestBed.createComponent(MyComponent);
  component = fixture.componentInstance;
  await fixture.whenStable();
});
```

### Signal Testing
Signals are functions—call them to read state:
```typescript
expect(component.mySignal()).toBe(expectedValue);
component.mySignal.set(newValue);
```

### Service Testing
Inject services via TestBed and mock external dependencies:
```typescript
let service: MyService;
beforeEach(() => {
  TestBed.configureTestingModule({});
  service = TestBed.inject(MyService);
});
```

## External Dependencies & Integration

### Firebase
- Initialized in `src/app/core/firebase.ts` using `environment.firebase` config
- Auth instance exported as singleton
- All auth operations routed through `Auth` service for consistency

### PrimeNG
- Theme: **Lara** preset configured in `app.config.ts`
- Modules imported as needed (ButtonModule, CardModule, DrawerModule, etc.)
- No theme customization files—use defaults + Tailwind overrides if needed

### Prettier Format
- Print width: **100**
- Single quotes for JS
- Angular parser for `.html` files

## Anti-Patterns & Gotchas

1. **Don't use NgModules**: All components are standalone; no feature modules
2. **Don't block on auth**: Always await `auth.ready` in guards before checking user state
3. **Don't mix signal/observable APIs**: Choose signals for component state, observables for service state
4. **Don't mutate shared state directly**: Use setter methods or `.next()` for BehaviorSubjects
5. **Firebase environment config**: Must exist in `src/environments/environment.ts` (not in repo—configure at deploy time)

## Reference Files

- **Routing & Auth**: [app.routes.ts](../src/app/app.routes.ts), [auth.guard.ts](../src/app/auth.guard.ts)
- **Auth Service**: [src/app/services/auth.ts](../src/app/services/auth.ts)
- **Dashboard State**: [src/app/pages/dashboard/dashboard.service.ts](../src/app/pages/dashboard/dashboard.service.ts)
- **Main Component**: [src/app/app.ts](../src/app/app.ts)
- **Config**: [app.config.ts](../src/app/app.config.ts), [tsconfig.json](../tsconfig.json)
