# API & Schema Definition - Ukrainian List Frankfurt

This document defines the data models, translation schemas, and client-side contact submission schemas used by the static page.

---

## 1. Locales Data Schema (`src/locales.js`)

All content on the page is localized. The structure of the `translations` object inside `locales.js` is structured as follows:

```json
{
  "ua": {
    "nav": {
      "manifest": "string",
      "results": "string",
      "representatives": "string",
      "contact": "string"
    },
    "hero": {
      "badge": "string",
      "title": "string",
      "subtitle": "string",
      "cta_contact": "string",
      "cta_manifest": "string"
    },
    "results": {
      "title": "string",
      "subtitle": "string",
      "headline": "string",
      "desc": "string",
      "list_percentage": "string",
      "list_votes": "string",
      "seats_won": "string",
      "seats_desc": "string",
      "official_end": "string"
    },
    "manifest": {
      "title": "string",
      "subtitle": "string",
      "card1_title": "string",
      "card1_text": "string",
      "card2_title": "string",
      "card2_text": "string",
      "card3_title": "string",
      "card3_text": "string",
      "card4_title": "string",
      "card4_text": "string"
    },
    "representatives": {
      "title": "string",
      "subtitle": "string",
      "elected_badge": "string",
      "c1_name": "string",
      "c1_role": "string",
      "c1_bio": "string",
      "..."
    },
    "contact": {
      "title": "string",
      "subtitle": "string",
      "viktoriia_invite": "string",
      "viktoriia_role": "string",
      "sofiia_role": "string",
      "label_name": "string",
      "label_email": "string",
      "label_subject": "string",
      "label_body": "string",
      "placeholder_name": "string",
      "placeholder_email": "string",
      "placeholder_subject": "string",
      "placeholder_body": "string",
      "btn_send": "string",
      "success_msg": "string",
      "validation_err": "string"
    },
    "footer": {
      "desc": "string",
      "links_title": "string",
      "contact_title": "string",
      "rights": "string"
    }
  },
  "de": { ... },
  "en": { ... }
}
```

---

## 2. Contact Form Submission Schema

The client-side contact form submits messages via a secure URL-encoded `mailto:` client trigger. 

### 2.1 Trigger Parameters

| Parameter | Type | Required | Destination | Description |
| :--- | :--- | :--- | :--- | :--- |
| `to` | Email | Yes | `viktoriia.vonrosen@gmail.com` | Primary contact address |
| `subject` | String | Yes | Email Subject Line | Structured as `[UD-FFM] Kontakt - {subject_input}` |
| `body` | String | Yes | Email Body | Auto-formatted template containing name, email, and message content |

### 2.2 Pre-filled Body Template

```text
Sehr geehrte Damen und Herren, / Шановні представники,

Sie haben eine Nachricht über das Kontaktformular der Webseite ud-ffm.de erhalten:

--------------------------------------------------
Name: [NAME_INPUT]
E-Mail: [EMAIL_INPUT]
Betreff: [SUBJECT_INPUT]
--------------------------------------------------

Nachricht:
[BODY_INPUT]

--------------------------------------------------
Mit freundlichen Grüßen
[NAME_INPUT]
```
