import urllib.request, json, ssl, sys

ctx = ssl.create_default_context()
base = 'https://englightededu.onrender.com/api/contacts/'
all_contacts = []
limit = 500
offset = 0

while True:
    url = f'{base}?limit={limit}&offset={offset}'
    req = urllib.request.Request(url, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        batch = json.loads(r.read())
    print(f'Fetched offset={offset} got={len(batch)}', flush=True)
    if not batch:
        break
    all_contacts.extend(batch)
    offset += limit
    if len(batch) < limit:
        break

print(f'\nTotal fetched: {len(all_contacts)}\n', flush=True)

schools = {}
for c in all_contacts:
    school = c.get('school') or 'No School'
    course = c.get('course') or 'No Course'
    if school not in schools:
        schools[school] = {}
    schools[school][course] = schools[school].get(course, 0) + 1

for school in sorted(schools):
    total = sum(schools[school].values())
    print(f'{school}: {total}')
    for course, count in sorted(schools[school].items(), key=lambda x: -x[1]):
        print(f'  {course}: {count}')
