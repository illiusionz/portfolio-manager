'use strict';
(self.webpackChunkfinance_app = self.webpackChunkfinance_app || []).push([
  [954],
  {
    41749: (a, o, e) => {
      e.r(o), e.d(o, { default: () => i });
      e(65043);
      var l = e(35475);
      const s = e.p + 'static/media/logo.6110fdfdd05685b42944.png';
      var t = e(13204),
        n = e(70579);
      const c = [
          { to: '/', icon: t.rQ8, label: 'Dashboard' },
          { to: '/stock-portfolio', icon: t.YYR, label: 'Stock Portfolio' },
          { to: '/ai-assistant', icon: t.TDE, label: 'A.I. Finance Assistant' },
          { to: '/calendar', icon: t.bfZ, label: 'Calendar' },
          { to: '/stock-news', icon: t.Nhm, label: 'Stock News' },
          { to: '/asset-management', icon: t.qvi, label: 'Asset Management' },
          { to: '/education', icon: t.$hd, label: 'Education' },
          { to: '/market-tools', icon: t.xdT, label: 'Market Tools' },
          { to: '/chat-room', icon: t.uN, label: 'Chat Room' },
        ],
        i = () =>
          (0, n.jsxs)('nav', {
            className: 'sidebar',
            children: [
              (0, n.jsx)('div', {
                className: 'sidebar-header',
                children: (0, n.jsx)('img', {
                  src: s,
                  alt: 'Logo',
                  className: 'logo',
                }),
              }),
              (0, n.jsx)('ul', {
                children: c.map((a) => {
                  let { to: o, icon: e, label: s } = a;
                  return (0, n.jsx)(
                    'li',
                    {
                      children: (0, n.jsxs)(l.N_, {
                        to: o,
                        children: [
                          (0, n.jsx)(e, { className: 'icon' }),
                          ' ',
                          s,
                        ],
                      }),
                    },
                    o
                  );
                }),
              }),
            ],
          });
    },
  },
]);
//# sourceMappingURL=954.5b2de67f.chunk.js.map
