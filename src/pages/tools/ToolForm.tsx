import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { createTool, updateTool, setCurrentTool, fetchTools , fetchToolById, getImageUrlFromPNGImage} from '@/store/slices/toolsSlice';
import { useToast } from '@/hooks/use-toast';
import { AITool } from '@/store/slices/toolsSlice';
import { Save, ArrowLeft } from 'lucide-react';
import RichTextEditor from '@/components/common/RichTextEditor';
import MultiSelectCategories from '@/components/common/MultiSelectCategories';
import ImageUpload from '@/components/common/ImageUpload';
import { DatePicker } from '@/components/common/DatePicker';
import { fetchCategories } from '@/store/slices/categoriesSlice';
import mql from "@microlink/mql";

interface ToolFormProps {
  mode: 'create' | 'edit';
}

const ToolForm = ({ mode }: ToolFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { currentTool, isLoading, tools } = useAppSelector((state) => state.tools);
  const { categories:categoriesList } = useAppSelector((state) => state.categories);
  const [categories, setCategories] = useState<string[]>([]);
  const [allcategories, setAllcategories] = useState([] as any);

  console.log("allcategories", allcategories);
  const [overview, setOverview] = useState('');
  const [description, setDescription] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [promptTemplate, setPromptTemplate] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [useCases, setUseCases] = useState<string[]>(['']);
  const [toolPros, setToolPros] = useState<string[]>(['']);
  const [toolCons, setToolCons] = useState<string[]>(['']);
  const [keyAchievements, setKeyAchievements] = useState<string[]>(['']);
    // const [url, setUrl] = useState("https://easy-peasy.ai");
    const [dynamic_screenshot, setDynamicScreenshot] = useState<string | null>(null);
    const [dynamic_logo, setDynamicLogo] = useState<string | null>(null);
  
  const [bannerImage, setBannerImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [logo, setLogo] = useState('');
  const [planType, setPlanType] = useState('');
  const [type, setType] = useState('tools');
  const [status, setStatus] = useState('');
  const [launchDate, setLaunchDate] = useState<Date | undefined>();
  const [isLoader, setIsLoader] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<AITool>({
    defaultValues: {
      name: '',
      tagline: '',
      companyName: '',
      toolUrl: '',
      rating: 0,
      authorBy: '',
      authorLink: '',
      authorRole: '',
      authorLocation: '',
      usersCount: '',
      price: '',
      readtime: '',
      viewsCount: '',
      newslink: '',
      videoUrl: '',
      overview: '',
      description: '',
      howToUse: '',
      promptTemplate: '',
      categories: [],
      features: [],
      useCases: [],
      toolPros: [],
      toolCons: [],
      keyAchievements: [],
      bannerImage: '',
      images: [],
      logo: '',
      planType: '',
      status: '',
      launchDate: '',
      isActive: true,
    }
  });
console.log("type", type);
  // Fetch tools data when component mounts
  useEffect(() => {
    console.log('ToolForm: Component mounted, mode:', mode, 'id:', id);
    dispatch(fetchTools({ page: 1, limit: 100 }));
        dispatch(fetchCategories({ page: 1, limit: 100, search: "" }));
    
  }, [dispatch]);
  useEffect(() => {
    const newList = [] as any;
    categoriesList.map((cat: any) => {
      newList.push({ value: cat.id, label: cat.name });
    });
    setAllcategories(newList);

    console.log('ToolForm: Categories loaded', categoriesList); 
  }, [categoriesList]);
  
  // Load tool data when in edit mode
  useEffect(() => {
    console.log('ToolForm: Edit effect triggered', { mode, id, toolsLength: tools.length, tools });
    if (mode === 'edit' && id && tools.length > 0) {
      getcontentById(id);
    }
  }, [mode, id, tools, dispatch]);
 
  useEffect(() => {
    if (mode === 'edit' && currentTool) {
      // Set form values when editing
      reset({
        name: currentTool.name || '',
        type: currentTool.type || '',
        tagline: currentTool.tagline || '',
        companyName: currentTool.companyName || '',
        toolUrl: currentTool.toolUrl || '',
        rating: currentTool.rating || 0,
        authorBy: currentTool.authorBy || '',
        authorLink: currentTool.authorLink || '',
        authorRole: currentTool.authorRole || '',
        authorLocation: currentTool.authorLocation || '',
        usersCount: currentTool.usersCount || '',
        price: currentTool.price || '',
        readtime: currentTool.readtime || '',
        viewsCount: currentTool.viewsCount || '',
        newslink: currentTool.newslink || '',
        videoUrl: currentTool.videoUrl || '',
        overview: currentTool.overview || '',
        description: currentTool.description || '',
        howToUse: currentTool.howToUse || '',
        promptTemplate: currentTool.promptTemplate || '',
        isActive: currentTool.isActive ?? true,
      });
      
      setOverview(currentTool.overview || '');
      setDescription(currentTool.description || '');
      setHowToUse(currentTool.howToUse || '');
      setPromptTemplate(currentTool.promptTemplate || '');
      setCategories(currentTool.categories || []);
      setFeatures(currentTool.features?.length ? currentTool.features : ['']);
      setUseCases(currentTool.useCases?.length ? currentTool.useCases : ['']);
      setToolPros(currentTool.toolPros?.length ? currentTool.toolPros : ['']);
      setToolCons(currentTool.toolCons?.length ? currentTool.toolCons : ['']);
      setKeyAchievements(currentTool.keyAchievements?.length ? currentTool.keyAchievements : ['']);
      
      setBannerImage(currentTool.bannerImage || '');
      setImages(currentTool.images || []);
      setLogo(currentTool.logo || '');
      setType(currentTool.type || '');
      setPlanType(currentTool.planType || '');
      setStatus(currentTool.status || '');
      setLaunchDate(currentTool.launchDate ? new Date(currentTool.launchDate) : undefined);
    }
  }, [currentTool, mode, reset]);

  const getcontentById = async(idv: any) => {   
    const resp = await dispatch(fetchToolById(idv));
    dispatch(setCurrentTool(resp?.payload?.data));
    console.log('ToolForm: Fetching tool by ID:', idv, 'Response:', resp);
    // return content.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').trim();
  }

  const removeEmptyValues = (obj: any) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );
  };
  console.log("currentTool.toolUrl", currentTool?.toolUrl);
  const onSubmit = async (data: AITool) => {
    try {
      setIsLoader(true);
      let d_description = "";
      let d_logo = "";
      let d_bannerImage = "";
      let images_list = [];
      console.log("currentTool.toolUrl", currentTool?.toolUrl);
      console.log("data?.toolUrl", data?.toolUrl);
      if(data?.toolUrl && currentTool?.toolUrl!= data?.toolUrl){
        const  response_image = await mql(data?.toolUrl, {
          screenshot: true,
          meta: true, // includes logo
        });
        const imgage_data = response_image?.data;
        console.log("imgage_dataimgage_data", imgage_data);
        const resp1 = await dispatch(getImageUrlFromPNGImage(imgage_data?.screenshot.url));
        console.log("resp1", resp1);
        const img_url = resp1?.payload.url;
        const resp2 = await dispatch(getImageUrlFromPNGImage(imgage_data?.logo.url));
        console.log("resp2", resp2);
        const logo_url = resp2?.payload.url;

        d_description = imgage_data?.description;
        d_logo = logo_url;
        d_bannerImage=img_url;
        images_list= [img_url];
        setLogo(logo_url);
        setBannerImage(img_url);
        setImages([img_url]);

        // console.log("cleanedData", cleanedData);
        // return false;
        // if (data.screenshot?.url) setScreenshot(data.screenshot.url);
        // if (data.logo?.url) setLogo(data.logo.url);
      }
console.log("d_bannerImage", d_bannerImage);
      // const [bannerImage, setBannerImage] = useState('');
      // const [images, setImages] = useState<string[]>([]);
      // const [logo, setLogo] = useState('');
    console.log("images", images);
    console.log("bannerImage", bannerImage);
    console.log("datadata", data);
      const toolData = {
        ...data,
        overview,
        description: d_description ? d_description: description || d_description,
        howToUse,
        promptTemplate,
        categories,
        features,
        useCases,
        toolPros,
        toolCons,
        keyAchievements,
        bannerImage:d_bannerImage ? d_bannerImage:  bannerImage || d_bannerImage,
        images: images_list ? images_list: images || images_list,
        logo : d_logo ? d_logo: logo || d_logo,
        planType,
        type,
        status,
        launchDate: launchDate?.toISOString(),
      };
      console.log("toolDatatoolData", toolData, JSON.stringify(toolData))
      const cleanedData = removeEmptyValues(toolData) as any;

      
    
      if (mode === 'create') {
        

        console.log("toolDatatoolData", toolData, JSON.stringify(cleanedData))
        await dispatch(createTool(cleanedData)).unwrap();
        dispatch(fetchTools({ page: 1, limit: 100 }));
       
        toast({
          title: 'Success',
          description: 'Tool created successfully',
        });
      } else {
        await dispatch(updateTool({ id: id!, tool: cleanedData })).unwrap();
        dispatch(fetchTools({ page: 1, limit: 100 }));
        toast({
          title: 'Success',
          description: 'Tool updated successfully',
        });
        
      }
      navigate('/tools');
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      toast({
        title: 'Error',
        description: `Failed to ${mode} tool`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/tools')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {mode === 'create' ? 'Create AI Tool' : 'Edit AI Tool'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'create' ? 'Add a new AI tool to the database' : 'Update tool information'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about the AI tool</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Logo */}
            <ImageUpload
              label="Logo"
              value={logo}
              onChange={(value) => setLogo(value as string)}
              multiple={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline *</Label>
                <Input
                  id="tagline"
                  {...register('tagline', { required: 'Tagline is required' })}
                  className={errors.tagline ? 'border-destructive' : ''}
                />
                {errors.tagline && (
                  <p className="text-sm text-destructive">{errors.tagline.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="prompts">Prompts</SelectItem>
                    <SelectItem value="articles">Articles</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="influencers">Influencers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {type==='tools' && (<>
              <div className="space-y-2">
                <Label>Plan Type</Label>
                <Select value={planType} onValueChange={setPlanType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
             
              <div className="space-y-2">
                <Label htmlFor="usersCount">Users Count</Label>
                <Input
                  id="usersCount"
                  {...register('usersCount')}
                />
              </div>
              </> )}
              <div className="space-y-2 md:col-span-2">
                <MultiSelectCategories
                  label="Categories"
                  value={categories}
                  onChange={setCategories}
                  placeholder="Select categories..."
                  required={true}
                  categoriesList={allcategories}
                />
              </div>
              {type==='tools' && (<>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  {...register('companyName')}
                  className={errors.companyName ? 'border-destructive' : ''}
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive">{errors.companyName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="toolUrl">Tool URL</Label>
                <Input
                  id="toolUrl"
                  type="url"
                  {...register('toolUrl')}
                  className={errors.toolUrl ? 'border-destructive' : ''}
                />
                {errors.toolUrl && (
                  <p className="text-sm text-destructive">{errors.toolUrl.message}</p>
                )}
              </div>
              </>)}
              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  {...register('rating')}
                  className={errors.rating ? 'border-destructive' : ''}
                />
                {errors.rating && (
                  <p className="text-sm text-destructive">{errors.rating.message}</p>
                )}
              </div>
              {type==='tools' && (<>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  {...register('price')}
                />
              </div>
</>)}
              <div className="space-y-2">
                <Label htmlFor="authorBy">Author *</Label>
                <Input
                  id="authorBy"
                  {...register('authorBy')}
                  className={errors.authorBy ? 'border-destructive' : ''}
                />
                {errors.authorBy && (
                  <p className="text-sm text-destructive">{errors.authorBy.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorLink">Author Link</Label>
                <Input
                  id="authorLink"
                  type="url"
                  {...register('authorLink')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorRole">Author Role</Label>
                <Input
                  id="authorRole"
                  {...register('authorRole')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorLocation">Author Location</Label>
                <Input
                  id="authorLocation"
                  {...register('authorLocation')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readtime">Read Time</Label>
                <Input
                  id="readtime"
                  {...register('readtime')}
                  placeholder="e.g., 5 min"
                />
              </div>
              {type==='tools' && (<>
              <div className="space-y-2">
                <DatePicker
                  label="Launch Date"
                  value={launchDate}
                  onChange={setLaunchDate}
                  placeholder="Select launch date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="viewsCount">Views Count</Label>
                <Input
                  id="viewsCount"
                  {...register('viewsCount')}
                />
              </div>
</>)}
{type==="news" && (
 <div className="space-y-2">
 <Label htmlFor="newslink">News Link</Label>
 <Input
   id="newslink"
   type="url"
   {...register('newslink')}
 />
</div>
)}
             

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  {...register('videoUrl')}
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Unpublished">Unpublished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Banner Image - moved above overview */}
            <ImageUpload
              label="Banner Image"
              value={bannerImage}
              onChange={(value) => { console.log("value", value); setBannerImage(value as string)}}
              multiple={false}
              required={true}
            />

            <RichTextEditor
              label="Overview"
              value={overview}
              onChange={setOverview}
              placeholder="Enter tool overview with bullet points..."
              required={true}
              error={!overview ? 'Overview is required' : undefined}
            />

            <RichTextEditor
              label="Description"
              value={description}
              onChange={setDescription}
              placeholder="Enter detailed description with bullet points..."
              // required={true}
              // error={!description ? 'Description is required' : undefined}
            />
 {type==="prompts" && (<>
            <RichTextEditor
              label="How to Use"
              value={howToUse}
              onChange={setHowToUse}
              placeholder="Enter instructions on how to use the tool..."
            />
         
            <RichTextEditor
              label="Prompt Template"
              value={promptTemplate}
              onChange={setPromptTemplate}
              placeholder="Enter prompt template or examples..."
            />
         </> )}
            
          </CardContent>
        </Card>


        {/* Features and Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Features and Additional Details</CardTitle>
            <CardDescription>Add key features, use cases, pros, and cons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Features</h4>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...features];
                      newFeatures[index] = e.target.value;
                      setFeatures(newFeatures);
                    }}
                    placeholder="Enter feature"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFeatures(features.filter((_, i) => i !== index))}
                    disabled={features.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setFeatures([...features, ''])}
              >
                Add Feature
              </Button>
            </div>
            {/* Use Cases */}
            {(type=="prompts" || type==="tools") && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Use Cases</h4>
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={useCase}
                    onChange={(e) => {
                      const newUseCases = [...useCases];
                      newUseCases[index] = e.target.value;
                      setUseCases(newUseCases);
                    }}
                    placeholder="Enter use case"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setUseCases(useCases.filter((_, i) => i !== index))}
                    disabled={useCases.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setUseCases([...useCases, ''])}
              >
                Add Use Case
              </Button>
            </div>
            )}
              {type==="tools" && (<>
            {/* Tool Pros */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Tool Pros</h4>
              {toolPros.map((pro, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={pro}
                    onChange={(e) => {
                      const newPros = [...toolPros];
                      newPros[index] = e.target.value;
                      setToolPros(newPros);
                    }}
                    placeholder="Enter pro"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setToolPros(toolPros.filter((_, i) => i !== index))}
                    disabled={toolPros.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setToolPros([...toolPros, ''])}
              >
                Add Pro
              </Button>
            </div>

            {/* Tool Cons */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Tool Cons</h4>
              {toolCons.map((con, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={con}
                    onChange={(e) => {
                      const newCons = [...toolCons];
                      newCons[index] = e.target.value;
                      setToolCons(newCons);
                    }}
                    placeholder="Enter con"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setToolCons(toolCons.filter((_, i) => i !== index))}
                    disabled={toolCons.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setToolCons([...toolCons, ''])}
              >
                Add Con
              </Button>
            </div>
            </> )}
              {/* KeyAchievements */}
              {type==="influencers" && (
              <div className="space-y-4">
              <h4 className="text-sm font-medium">Key Achievements</h4>
              {keyAchievements.map((con, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={con}
                    onChange={(e) => {
                      const newCons = [...keyAchievements];
                      newCons[index] = e.target.value;
                      setKeyAchievements(newCons);
                    }}
                    placeholder="Enter con"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setKeyAchievements(keyAchievements.filter((_, i) => i !== index))}
                    disabled={keyAchievements.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setKeyAchievements([...keyAchievements, ''])}
              >
                Add New Key Achievement
              </Button>
            </div>
)}
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Images</CardTitle>
            <CardDescription>Upload up to 10 additional images</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              label="Additional Images (up to 10)"
              value={images}
              onChange={(value) => setImages(value as string[])}
              multiple={true}
            />
          </CardContent>
        </Card>

        {/* Active Status */}
        <Card>
          <CardHeader>
            <CardTitle>Active Status</CardTitle>
            <CardDescription>Set the visibility status of this tool</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                {...register('isActive')}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons - Right Aligned */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/tools')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-gradient-primary">
            <Save className="w-4 h-4 mr-2" />
            {mode === 'create' ? 'Create Tool' : 'Update Tool'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ToolForm;