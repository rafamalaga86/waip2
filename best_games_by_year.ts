const games = {
  1972: ['https://images.igdb.com/igdb/image/upload/t_cover_big/co2erg.webp'], // Pong
  1980: ['https://images.igdb.com/igdb/image/upload/t_cover_big/co4ulc.webp'],
  1981: ['https://images.igdb.com/igdb/image/upload/t_720p/co546n.webp'],
  1982: ['https://images.igdb.com/igdb/image/upload/t_cover_big/co5ssx.webp'],
  1983: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co21ip.webp', // Mario Bros.
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co790c.webp', // Dragon's Lair
  ],
  1984: [
    'https://images.igdb.com/igdb/image/upload/t_720p/co4i7u.webp', // H.E.R.O.
    'https://images.igdb.com/igdb/image/upload/t_720p/co4ebl.webp', // Gauntlet
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1w4l.webp', // 1942
  ],
  1985: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6pib.webp', // Super Mario Bros.
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co20fk.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5djm.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co4v5i.webp',
  ],
  1986: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1uii.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6dcb.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co7j5x.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2oj4.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xe8.webp',
  ],
  1987: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2xv8.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co4ben.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5x4b.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co7kt9.webp',
  ],
  1988: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co7ozx.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3u7r.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co4sz8.webp',
  ],
  1989: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a0q.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co25qt.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co7o14.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vww.webp', // Prince of Persia Apple II
  ],
  1990: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co28bp.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1y83.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6ufz.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3whu.webp',
  ],
  1991: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co55et.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3vzn.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6yzr.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co49sb.webp', // SimCity
  ],
  1992: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co7ong.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co49sn.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5kkj.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6ys2.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co82bd.webp', // Alone in the dark
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6c1k.webp', // Mortal Kombat
  ],
  1993: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5rav.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2u6w.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3tu2.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1y96.webp', // Myst
  ],
  1994: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5osy.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co70qn.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6iip.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co31c2.webp',
  ],
  1995: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3plw.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2kn9.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wix.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co88m7.webp',
  ],
  1996: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co721v.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5pi4.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co20bp.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3hfx.webp',
  ],
  1997: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co53m8.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2kx2.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co62k0.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2n5v.webp',
  ],
  1998: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co7q89.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co7k2q.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3nnx.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2vz0.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7n.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co20gb.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co873w.webp',
  ],
  1999: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2vye.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1y79.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co55xo.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2z7d.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1ybj.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2q3l.webp',
  ],
  2000: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3gfq.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2unc.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3hcl.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3pah.webp', // Majora's Mask
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co81pl.webp', // Counter Strike
  ],
  2001: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5tki.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2vyg.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r2r.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tr1.webp', // Final Fantasy X
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lb8.webp', // GTA 3
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wb2.webp', // Max Payne
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co21yv.webp', // Super Smash Bros Melee
  ],
  2002: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1qrt.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3w4w.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xuq.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbb.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1oym.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co30zf.webp', // Kingdom Hearts
  ],
  2003: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co4t8l.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmz.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6nqo.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2n19.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2agi.webp',
  ],
  2004: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nmw.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vpf.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vpf.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l7z.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5ei5.webp',
  ],
  2005: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2wk8.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3ddc.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1ozz.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wa0.webp', // Guitar hero
  ],
  2006: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co28gi.webp', // Gears of War
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2yqt.webp', // Dwarf Fortress
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co21rm.webp', // New Super Mario Bros.
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tc8.webp', // The Elder Scroll: Oblivion
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3vge.webp', // Wii Sports
  ],
  2007: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2mli.webp', // Bioshock
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.webp', // Portal
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wko.webp', // Call of Duty 4: Modern Warfare
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2on1.webp', // Crysis
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co21ro.webp', // Super Mario Galaxy
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xhc.webp', // Halo 3
  ],
  2008: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1ycw.webp', // Fallout 3
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbv.webp', // Grand Theft Auto 4
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co25ni.webp', // Braid
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1qrm.webp', // Left 4 Dead
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2g7w.webp', // Dead Space
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1u07.webp', // Persona 4
  ],
  2009: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rcf.webp', // Assasin's Creed II
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnb.webp', // Uncharted II
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co27sk.webp', // Demon's Souls
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3cwt.webp', // Modern Warfare II
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1p92.webp', // Bayonetta
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co49wj.webp', // League of Legends
  ],
  2010: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co20ac.webp', // Mass Effect 2
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co21tl.webp', // Super Mario Galaxy 2
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3koi.webp', // God of War 3
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lcv.webp', // Red Dead Redemption
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6t4d.webp', // Assasin's Creed Brotherhood
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3rhy.webp', // Heavy Rain
  ],
  2011: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x78.webp', // Dark Souls
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1voh.webp', // Batman Arkham City
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xbu.webp', // Battlefield 3
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1v7k.webp', // Rayman Origins
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbo.webp', // Terraria
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1qll.webp', // The Binding of Isaac
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.webp', // Minecraft
  ],
  2012: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2j1g.webp', // The Walking Dead
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5pcs.webp', // Dishonored
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vpd.webp', // Far Cry 3
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co20tn.webp', // Borderlands 2
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l1u.webp', // Diablo III
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2eez.webp', // Dear Esther,
  ],
  2013: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.webp', // Grand Theft Auto V
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.webp', // The Last of Us
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbu.webp', // Tomb Raider
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6ene.webp', // Dota 2
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rc9.webp', // The Staney Parable
    'https://images.igdb.com/igdb/image/upload/t_cover_big/qwhxxrcxzw7inwfrfkbq.webp', // Gone Home
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vep.webp', // Papers Please
  ],
  2014: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1sh2.webp',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6ffy.webp',
  ], // Heartstone],
  2015: ['https://images.igdb.com/igdb/image/upload/t_cover_big/co2855.webp'],
  2016: [],
  2017: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co545w.webp', // Resident Evil VII
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.webp', // Breath of the wild
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1mxf.webp', // Super Mario Oddyssey
  ],
  2018: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.webp', // Red Dead Redemption II
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.webp', // God of War
  ],
  2019: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1ir3.webp', // Resident Evil II
  ],
  2020: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co39vc.webp', // Hades
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co87vg.webp', // Half Life Alyx
  ],
  2021: [],
  2022: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp', // Elden Ring
  ],
  2023: [
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.webp', // Tears of the kingdom
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.webp', // Baldur's Gate
  ],
  2024: [],
  2025: [],
};
