"""Build the public academic CV from a JSON export of the website's content modules.
Usage: python scripts/pdf/build_cv.py /path/to/content-export.json
Requires reportlab. Keep publication status and career facts in lib/content.ts and lib/research.ts.
"""
import json,sys,re
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
D=json.loads(Path(sys.argv[1]).read_text()); C=D['content']['siteContent'];R=D['research'];updated=D['content']['lastUpdated']
root=Path(__file__).resolve().parents[2]
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='Name',fontName='Helvetica-Bold',fontSize=25,leading=30,spaceAfter=8,textColor=colors.HexColor('#12233b')))
styles.add(ParagraphStyle(name='SectionTitle',fontName='Helvetica-Bold',fontSize=13,leading=17,spaceBefore=10,spaceAfter=6,textColor=colors.HexColor('#a94313'),keepWithNext=True))
styles.add(ParagraphStyle(name='Entry',fontName='Helvetica-Bold',fontSize=10.2,leading=14,spaceBefore=7,spaceAfter=3,keepWithNext=True))
styles.add(ParagraphStyle(name='TextBody',fontName='Helvetica',fontSize=9.2,leading=12.6,spaceAfter=5))
styles.add(ParagraphStyle(name='SmallText',fontName='Helvetica',fontSize=8.4,leading=11,spaceAfter=4,textColor=colors.HexColor('#475569')))
flow=[]
def clean(t):return escape(t.replace('–','-').replace('—','-').replace('“','"').replace('”','"').replace('’',"'").replace('‑','-'))
def p(t,style='TextBody'):flow.append(Paragraph(clean(t),styles[style]))
def h(t):p(t,'SectionTitle')
def link(label,url):return '<link href="'+escape(url,{'"':'&quot;'})+'" color="#a94313">'+clean(label)+'</link>'
def top(section):p('Ahmad Salehiyan','Name');p(section,'SmallText')
def page():flow.append(PageBreak())
top('Ph.D. Candidate | Reinforcement Learning and Optimization')
flow.append(Paragraph('Oklahoma State University | Stillwater, Oklahoma<br/>'+link('ahmad@salehiyan.com','mailto:ahmad@salehiyan.com')+' | '+link('www.salehiyan.com','https://www.salehiyan.com')+'<br/>'+link('Google Scholar',C['person']['scholar'])+' | '+link('ORCID: 0009-0009-2877-8715',C['person']['orcid'])+' | '+link('LinkedIn',C['person']['linkedin']),styles['TextBody']))
h('Research profile');p(C['hero']['summary']);p(C['about']['availability'],'SmallText')
h('Education')
for e in C['education']:
 p(e['degree'],'Entry');p(e['institution']+' | '+e['period'])
 if e.get('focus'):p(e['focus'],'SmallText')
 if e.get('advisor'):p('Advisor: '+e['advisor'],'SmallText')
h('Research and industry experience')
for e in C['experience']:
 if e['role']=='Graduate Teaching Assistant':continue
 p(e['role']+' | '+e['organization'],'Entry');p(e['period'],'SmallText');p(e['summary'])
page();top('Research projects and technical methods');h('Selected research')
entries=[('Multi-agent fleet maintenance','Dissertation research; manuscript in preparation. I study decentralized maintenance scheduling for heterogeneous fleets with shared resources. The two-phase Safe-MARL approach uses soft constraints during exploration and hard constraints for enforcement. No results are reported yet.'),('Multi-sensor POMDP maintenance','Lead author of a framework for condition-based maintenance under partial observability. Multiple sensor streams inform belief states and control-limit policies. Belief-state aggregation and state-space compression address high-dimensional observations. TechRxiv preprint (2024); related manuscript submitted to INFORMS Journal on Data Science.'),('Hierarchical DDQN warehouse picker routing','Lead author. Dynamic programming solves aisle-level routing subproblems and a DDQN agent chooses aisle sequences in two-block warehouses. Reported total travel distance is 3.0% to 15.4% shorter than S-shape and largest-gap heuristics in the evaluated settings. SSRN preprint No. 7052096.'),('Disease clusters in MIMIC-IV electronic health records','Co-author. Association rule mining and clustering of 179,524 adult patients, with 11,733 mortality cases and 846 distinct diseases. Apriori identified 628 rules with confidence above 50%; t-SNE and k-means grouped the rules. IISE conference proceedings (2025).'),('Transformer-based intrusion detection','First author of two journal articles. Developed Transformer-based frameworks for intrusion detection in edge and industrial IoT systems and false data injection detection in smart water infrastructure. The intrusion study used WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT benchmarks.')]
for title,body in entries:p(title,'Entry');p(body)
h('Technical methods and tools')
for group in C['skillGroups']:p(group['title']+': '+', '.join(group['items'])+'.','SmallText')
page();top('Publications');p('Publication status is stated separately below. Preprints and manuscripts in preparation are not listed as peer-reviewed publications.','SmallText')
for g in R['publicationGroups']:
 h(g['title'])
 for pub in R['publications']:
  if pub['group']!=g['group']:continue
  authors=', '.join(a['short'] for a in pub['authors']);p(authors+'. '+pub['title']+'.')
  details=[]
  if pub.get('venue'):details.append(pub['venue'])
  if pub.get('volume'):details.append(pub['volume']+('('+pub['issue']+')' if pub.get('issue') else ''))
  if pub.get('pages'):details.append(pub['pages'])
  if pub.get('year'):details.append(pub['year'])
  if details:p(', '.join(details)+'.','SmallText')
  if pub.get('status'):p(pub['status'],'SmallText')
  url='https://doi.org/'+pub['doi'] if pub.get('doi') else pub.get('preprint')
  if url:flow.append(Paragraph(link('DOI: '+pub['doi'] if pub.get('doi') else 'Read the preprint',url),styles['SmallText']))
page();top('Teaching, presentations, and service');h('Teaching experience')
for t in C['teaching']['courses']:
 p(t['course'],'Entry');p(t['role']+' | '+t['terms'],'SmallText');p(t['details'])
h('Conference presentations')
for t in sorted(R['talks'],key=lambda t:t['sortDate'],reverse=True):
 p(t['title'],'Entry');p(t['meeting']+(' | '+t['city'] if t.get('city') else '')+' | '+t['displayDate']+' | '+t['type']+(' | '+t['note'] if t.get('note') else ''),'SmallText')
h('Service and leadership');p(C['service']['reviewing']+' '+ '; '.join(C['service']['journals'])+'.')
for item in C['leadership']:p(item['role']+', '+item['organization']+(' | '+item['period'] if item['period'] else '')+'.','SmallText')
h('Award and professional memberships')
for a in C['awards']:p(a['title']+', '+a['organization']+', '+a['year']+'.','SmallText')
p('; '.join(C['service']['memberships'])+'.','SmallText')
def footer(canvas,doc):
 canvas.setStrokeColor(colors.HexColor('#cbd5e1'));canvas.line(43,38,569,38)
 canvas.setFont('Helvetica',8);canvas.setFillColor(colors.HexColor('#475569'));canvas.drawString(43,25,'Ahmad Salehiyan | www.salehiyan.com | Updated '+updated);canvas.drawRightString(569,25,str(doc.page))
out=root/'public/files/Ahmad-Salehiyan-CV.pdf'
SimpleDocTemplate(str(out),pagesize=letter,rightMargin=43,leftMargin=43,topMargin=39,bottomMargin=50,title='Ahmad Salehiyan - Academic CV',author='Ahmad Salehiyan',subject='Reinforcement learning, POMDPs, and optimization').build(flow,onFirstPage=footer,onLaterPages=footer)
print(out)
