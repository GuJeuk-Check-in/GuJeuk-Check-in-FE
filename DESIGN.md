# GuJeuk Check-in FE Design System

## 1. Product Surface

This app has two visual planes: public check-in forms and an admin management/reporting shell. Issue #118 belongs to the admin reporting shell and should preserve the current quiet, document-like style.

## 2. Tokens

- Primary action blue: `#0f50a0`, hover `#0a4085`.
- Text: primary `#000000`, body `#333333`, muted `#565656`, inverse `#ffffff`.
- Report borders: `#555555`.
- Report header fill: `#f1f1f1`.
- Modal overlay: `rgba(0, 0, 0, 0.55)`.
- Report value blue: `#443cff`.

## 3. Typography

- Admin buttons use 1.1rem to 1.5rem Korean UI text with 600 weight for action labels.
- Report previews use Apple SD Gothic Neo, Malgun Gothic, and sans-serif fallbacks.
- Report section lines are bold and large enough to resemble the HWP source documents.

## 4. Spacing

- Admin sidebar controls use roomy vertical gaps and pill-shaped action buttons.
- Report previews use page-like white surfaces, generous padding, collapsed tables, and horizontal overflow when the table is wider than the viewport.

## 5. Primitives

- `ExcelButton`: pill action button with export icon, primary border, stable min width, hover lift, and disabled state.
- `DateExportModal`: centered selection dialog for year/month based exports.
- Report preview modal: fixed overlay, action bar, white printable report page, print CSS that hides surrounding UI and prints only the report article.
- Report table: collapsed bordered table, gray header cells, bold row labels, centered numeric cells, and dash placeholders for unavailable values.
