import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Southbank Alumni Network",
  description:
    "Terms of service for using the Southbank Alumni Network platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="pt-32 pb-24 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            <strong className="text-gray-500">Southbank Alumni Network</strong>
            &nbsp;&middot;&nbsp;Last updated: 3 May 2026
          </p>

          <div className="mt-12 space-y-10 text-base text-gray-600 leading-relaxed">
            {/* 1. About this service */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. About this service
              </h2>
              <p>
                The Southbank Alumni Network is a student-led platform that
                connects current Southbank International School students with
                alumni. By using this website, you agree to these terms.
              </p>
            </section>

            {/* 2. Who can use this service */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. Who can use this service
              </h2>
              <ul className="space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  <strong className="text-gray-600">Alumni:</strong> Former
                  students of Southbank International School who wish to share
                  their profile information with current students.
                </li>
                <li>
                  <strong className="text-gray-600">Students:</strong> Current
                  students of Southbank International School who wish to browse
                  alumni profiles or post project proposals.
                </li>
              </ul>
            </section>

            {/* 3. Alumni profiles */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. Alumni profiles
              </h2>
              <p>
                By submitting your profile to the Southbank Alumni Network, you
                agree that:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  The information you provide is accurate and truthful.
                </li>
                <li>
                  Your profile will be publicly visible on the website to anyone
                  who visits it.
                </li>
                <li>
                  If you opt in to being contacted, your LinkedIn profile URL
                  will be displayed alongside your profile.
                </li>
                <li>
                  Your profile will be reviewed by an administrator before it is
                  published. We reserve the right to decline any submission.
                </li>
                <li>
                  You can request the removal of your profile at any time by
                  contacting us at{" "}
                  <a
                    href="mailto:maxelijahcoppel@gmail.com"
                    className="text-[#7BAFD4] hover:underline"
                  >
                    maxelijahcoppel@gmail.com
                  </a>
                  . We will remove it within 30 days.
                </li>
                <li>
                  You are responsible for keeping your profile information up to
                  date. We will contact you annually to verify your details.
                </li>
              </ul>
            </section>

            {/* 4. Student project feed */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. Student project feed
              </h2>
              <p>
                By posting a project on the public feed, you agree that:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  Your post will be publicly visible on the website.
                </li>
                <li>
                  The information you include is accurate and appropriate.
                </li>
                <li>
                  Posts must not contain offensive, discriminatory, or
                  inappropriate content.
                </li>
                <li>
                  We reserve the right to remove any post that violates these
                  terms.
                </li>
              </ul>
            </section>

            {/* 5. Communication via LinkedIn */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. Communication via LinkedIn
              </h2>
              <p>
                This website does not provide any messaging or communication
                functionality. All contact between students and alumni takes
                place externally via LinkedIn. We are not responsible for any
                interactions, messages or outcomes that occur on LinkedIn or any
                other external platform. LinkedIn&apos;s own terms of service and
                privacy policy apply to any communication conducted there.
              </p>
            </section>

            {/* 6. Acceptable use */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                6. Acceptable use
              </h2>
              <p>You agree not to:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  Use this website for any unlawful purpose.
                </li>
                <li>
                  Submit false, misleading or impersonating information.
                </li>
                <li>
                  Attempt to access another user&apos;s data or the
                  administrative areas of the site without authorisation.
                </li>
                <li>
                  Scrape, copy or harvest data from this website for any purpose.
                </li>
                <li>
                  Use the platform to harass, spam or send unsolicited messages
                  to alumni or students.
                </li>
              </ul>
            </section>

            {/* 7. Data protection */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                7. Data protection
              </h2>
              <p>
                We take data protection seriously. Please read our{" "}
                <Link
                  href="/privacy"
                  className="text-[#7BAFD4] hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                for full details on what data we collect, how we use it, and your
                rights. By using this service, you acknowledge that you have read
                and understood our Privacy Policy.
              </p>
            </section>

            {/* 8. Intellectual property */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                8. Intellectual property
              </h2>
              <p>
                The content of this website, including its design and code, is
                owned by the Southbank Alumni Network project team. The Southbank
                International School name and logo are used with permission and
                remain the property of the school.
              </p>
              <p className="mt-4">
                Alumni own the content of their individual profiles. By
                submitting a profile, you grant us a non-exclusive licence to
                display that content on the website for as long as you consent.
              </p>
            </section>

            {/* 9. Disclaimers */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                9. Disclaimers
              </h2>
              <ul className="space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  This website is provided &ldquo;as is&rdquo; without
                  warranties of any kind.
                </li>
                <li>
                  We do not guarantee the accuracy of any alumni profile
                  information.
                </li>
                <li>
                  We are not responsible for any outcomes resulting from
                  connections made through this platform.
                </li>
                <li>
                  We do not verify the identity or background of alumni listed on
                  the site. Students should exercise their own judgement when
                  contacting alumni.
                </li>
                <li>
                  This is a student-led project and is not an official service of
                  Southbank International School unless otherwise stated.
                </li>
              </ul>
            </section>

            {/* 10. Changes to these terms */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                10. Changes to these terms
              </h2>
              <p>
                We may update these terms from time to time. Changes will be
                posted on this page with an updated date. Continued use of the
                website after changes are posted constitutes acceptance of the
                updated terms.
              </p>
            </section>

            {/* 11. Contact */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                11. Contact
              </h2>
              <p>
                For any questions about these terms, email us at{" "}
                <a
                  href="mailto:maxelijahcoppel@gmail.com"
                  className="text-[#7BAFD4] hover:underline"
                >
                  maxelijahcoppel@gmail.com
                </a>
                .
              </p>
            </section>
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="text-sm text-[#7BAFD4] hover:underline"
            >
              &larr; Back to the map
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
