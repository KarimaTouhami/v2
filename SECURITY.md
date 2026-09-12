# 🔐 Security Policy

## 🛡️ Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | ✅ yes bestie      |
| < 2.0   | ❌ nah fam         |

## 🐛 Reporting a Vulnerability

found a security issue? first of all, thank you for looking out 💚

**please don't:**
- ❌ open a public issue (we don't want the script kiddies getting ideas)
- ❌ post it on social media (clout isn't worth the chaos)
- ❌ exploit it yourself (be a good human pls)

**instead, do this:**
1. 📧 use the **contact form** at [karimatouhami.com/contact](https://karimatouhami.com/contact)
2. 📝 include:
   - description of the vulnerability
   - steps to reproduce
   - potential impact
   - any suggested fixes (if you got em)
3. 🕐 give me 48-72 hours to respond (i'll get back to you asap, promise)

## ⚡ What to Expect

- **acknowledgment:** i'll respond within 72 hours max
- **updates:** you'll get regular updates on the progress
- **credit:** if you want credit in the fix, lmk! (or stay anonymous, that's cool too)
- **timeline:** aiming to patch critical issues within 7 days

## 🎯 Scope

this is a personal portfolio website, so the attack surface is pretty small, but security still matters! here's what's in scope:

**in scope:**
- ✅ XSS vulnerabilities
- ✅ dependency vulnerabilities
- ✅ authentication/authorization issues (if any exist)
- ✅ data exposure
- ✅ anything that could harm users

**out of scope:**
- ❌ social engineering attacks
- ❌ physical attacks (obviously lol)
- ❌ "you spelled something wrong" (that's not a security issue bestie)
- ❌ theoretical attacks with no practical impact

## 🔒 Security Best Practices Used

just so you know what's already baked in:

- 🔐 **no sensitive data storage** - we don't collect or store personal info (except contact form submissions)
- 🌐 **https only** - all traffic is encrypted (thanks vercel)
- 📦 **dependency updates** - using dependabot to catch vulnerable packages
- 🧹 **minimal dependencies** - less code, less attack surface
- 🚫 **no server-side secrets** - everything that needs to be secret, is secret
- ✨ **content security policy** - protecting against XSS

## 🤝 Responsible Disclosure

i believe in responsible disclosure. if you find something:
- give me a reasonable time to fix it before going public
- i'll keep you updated on the fix
- we'll coordinate on disclosure timing

## 💡 Questions?

got questions about security stuff? hit me up via the [contact form](https://karimatouhami.com/contact)

---

stay safe out there! 🛡️✨
